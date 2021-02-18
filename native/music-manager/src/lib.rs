#[cfg(test)]
mod tests;

use cpal::Device;
use cpal::{traits::HostTrait, Host};
use rodio::{DeviceTrait, Source};
use std::{
    fs::File,
    io::BufReader,
    path::{Path, PathBuf},
};
use thiserror::Error;
use tokio::fs;

#[derive(Error, Debug)]
pub enum MusicError {
    #[error(transparent)]
    IoError(#[from] std::io::Error),
}

pub async fn get_music_file_path(dir: &str, extensions: &str) -> Result<PathBuf, MusicError> {
    let mut entrys_dir = fs::read_dir(dir).await?;

    // let mut handles = Vec::new();

    while let Some(entry) = entrys_dir.next_entry().await? {
        let dir = entry.path();
        println!("dir: {}", dir.display());
    }

    return Ok(PathBuf::new());
}

async fn get_file_path_with_extension(dir: &str, extensions: &str) {}

pub fn play_music(path: &str) {
    let host = cpal::default_host();
    let mut devices = host.output_devices().unwrap();
    let device = devices
        .find(|d| d.name().unwrap().contains("CABLE"))
        .unwrap();
    let (_stream, stream_handle) = rodio::OutputStream::try_from_device(&device).unwrap();

    let file = File::open(path).unwrap();

    let sink = stream_handle.play_once(file).unwrap();
    sink.set_volume(0.2);
    sink.play();

    // loop {}
}
