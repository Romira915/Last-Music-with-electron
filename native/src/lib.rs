use std::{
    fs::File,
    sync::{
        self,
        mpsc::{self, Sender},
    },
    thread,
};

use neon::prelude::*;
use rodio::{OutputStream, OutputStreamHandle, Sink};
use thread::JoinHandle;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node"))
}

fn open(mut cx: FunctionContext) -> JsResult<JsString> {
    std::fs::File::create("foo.txt").unwrap();
    Ok(cx.string("create file."))
}

fn music_play_ts(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let arg = cx.argument::<JsString>(0)?.value();
    music_manager::play_music(&arg);
    std::thread::spawn(move || music_manager::play_music(&arg));

    Ok(cx.undefined())
}

fn test_fn(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let arg = cx.argument::<JsNumber>(0)?;

    Ok(cx.undefined())
}

struct BackgroundTask;
impl Task for BackgroundTask {
    type Output = i32;
    type Error = String;
    type JsEvent = JsNumber;
    fn perform(&self) -> Result<Self::Output, Self::Error> {
        music_manager::play_music("path");
        Ok(17)
    }
    fn complete(
        self,
        mut cx: TaskContext,
        result: Result<Self::Output, Self::Error>,
    ) -> JsResult<Self::JsEvent> {
        Ok(cx.number(result.unwrap()))
    }
}
pub fn perform_async_task(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let f = cx.argument::<JsFunction>(0)?;
    BackgroundTask.schedule(f);
    Ok(cx.undefined())
}

pub struct MusicPlayer {
    sink_thread: JoinHandle<()>,
    control_channel: Sender<bool>,
}

declare_types! {
    pub class JsMusicPlayer for MusicPlayer {
        init(mut cx) {
            use cpal::Device;
            use cpal::{traits::HostTrait, Host};
            use rodio::{DeviceTrait, Source};
            let path = cx.argument::<JsString>(0)?.value();

            let (sender, receiver) = std::sync::mpsc::channel();

            let sink_thread = thread::spawn(move || {
                let host = cpal::default_host();
                let mut devices = host.output_devices().unwrap();
                let device = devices
                    .find(|d| d.name().unwrap().contains("CABLE"))
                    .unwrap();
                let (_stream, stream_handle) = rodio::OutputStream::try_from_device(&device).unwrap();
                let file = File::open(path).unwrap();

                let sink = stream_handle.play_once(file).unwrap();
                sink.pause();
                sink.set_volume(0.4);
                while let Ok(should_play) = receiver.recv() {
                    if should_play {
                        sink.play();
                    } else {
                        sink.pause();
                    }
                }
            });

            Ok(MusicPlayer{
                sink_thread,
                control_channel: sender,
            })
        }

        method play(mut cx){
            let this = cx.this();
            {
                let guard = cx.lock();
                let player = this.borrow(&guard);
                player.control_channel.send(true).unwrap();
                println!("play in Rust");
            }

            Ok(cx.undefined().upcast())
        }
    }
}

register_module!(mut cx, {
    cx.export_function("hello", hello)?;
    cx.export_function("open", open)?;
    cx.export_function("musicPlayTs", music_play_ts)?;
    cx.export_function("task", perform_async_task)?;
    cx.export_class::<JsMusicPlayer>("MusicPlayer")
});
