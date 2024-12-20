#!/bin/bash

# Konfigurasi
NAS_IP="10.25.31.67"
NAS_SHARE="/owlexa-share"          # Nama share di NAS
MOUNT_POINT="/mnt/owlexa-share"          # Lokasi mounting di sistem lokal
USERNAME="fatur"             # Username untuk akses NAS
PASSWORD="Owl3x@!2345^"             # Password untuk akses NAS

# Periksa apakah direktori mount point ada
if [ ! -d "$MOUNT_POINT" ]; then
    echo "Membuat direktori mount point di $MOUNT_POINT"
    mkdir -p "$MOUNT_POINT"
fi

# Melakukan mounting
echo "Mounting SMB dari //$NAS_IP/$NAS_SHARE ke $MOUNT_POINT"
mount -t cifs -o username=fatur,password=Owl3x@!2345^ //10.25.31.67/owlexa-share /mnt/owlexa-share
# Periksa apakah mounting berhasil
if [ $? -eq 0 ]; then
    echo "Mount berhasil!"
else
    echo "Gagal melakukan mounting. Periksa konfigurasi atau kredensial."
    exit 1
fi
