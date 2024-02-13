import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface Props {
  images: {
    original: string;
    thumbnail: string;
  }[];
}

const GalleryImage = ({ images = [] }: Props) => {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxIsOpen(true);
  };

  const closeLightbox = () => {
    setLightboxIsOpen(false);
  };

  return (
    <div>
      <ImageGallery
        items={images}
        autoPlay
        lazyLoad
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
      />
    </div>
  );
};

export default GalleryImage;
