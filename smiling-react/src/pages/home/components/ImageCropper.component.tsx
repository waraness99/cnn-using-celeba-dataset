import React, { FC, useState } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  HStack,
} from "@chakra-ui/react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface ImageCropperProps {
  isOpen: boolean;
  onClose: any;
  src: string;
  onAction: (file: string | Blob) => void;
  initialAspectRatio?: number;
  aspectRatio?: number;
}

function hasAlpha(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let hasAlphaPixels = false;
  for (let i = 0, dx = 0; dx < data.length; i++, dx = i << 2) {
    if (data[dx + 3] <= 8) {
      hasAlphaPixels = true;
      break;
    }
  }
  return hasAlphaPixels;
}

function getCanvasBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const hasAlphaPixels = hasAlpha(canvas);
    const extension = hasAlphaPixels ? "image/png" : "image/jpeg";
    canvas.toBlob(
      (file) => {
        if (file) {
          resolve(file);
        } else {
          reject();
        }
      },
      extension,
      0.8,
    );
  });
}

const ImageCropper: FC<ImageCropperProps> = ({ isOpen, onClose, onAction, src, initialAspectRatio, aspectRatio }) => {
  const [cropper, setCropper] = useState<any>();
  const uploadCroppedImage = async () => {
    try {
      const blob = await getCanvasBlob(cropper.getCroppedCanvas());
      onAction(blob);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size="lg" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crop your image to only select face</ModalHeader>

        <ModalBody pos="relative">
          <Cropper
            src={src}
            style={{ height: 400, width: "100%" }}
            guides={false}
            onInitialized={(instance: any) => {
              setCropper(instance);
            }}
            initialAspectRatio={initialAspectRatio}
            aspectRatio={aspectRatio}
            viewMode={1}
          />
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={uploadCroppedImage} colorScheme="blue">
              Upload
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
export default ImageCropper;
