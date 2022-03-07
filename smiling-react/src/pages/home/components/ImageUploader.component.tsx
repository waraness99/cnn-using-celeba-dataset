import React, { useState } from "react";
import { Icon, VisuallyHidden, Box, Stack, Text, useColorModeValue as mode } from "@chakra-ui/react";
import { IoMdDownload } from "react-icons/io";
import Dropzone from "react-dropzone";

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [imageFile, setImageFile] = useState<File[]>([]);

  const handleChangeFiles = (files: File[]) => {
    setImageFile(files);
    onUpload(files);
  };

  return (
    <Dropzone
      preventDropOnDocument={false}
      maxFiles={1}
      accept="image/jpeg"
      onDrop={(acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) {
          return;
        }
        handleChangeFiles(acceptedFiles);
      }}
      multiple={false}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <>
          <Stack
            borderColor="gray.600"
            align="center"
            justify="center"
            bg={isDragActive ? mode(`gray.200`, `whiteAlpha.100`) : mode(`gray.100`, `whiteAlpha.200`)}
            p="2"
            borderRadius="md"
            color="white"
            {...getRootProps()}
          >
            <Stack
              width="100%"
              py="6"
              align="center"
              color={isDragActive ? mode(`gray.600`, `whiteAlpha.700`) : mode(`gray.500`, `whiteAlpha.600`)}
              borderColor={isDragActive ? mode(`gray.600`, `whiteAlpha.700`) : mode(`gray.300`, `whiteAlpha.600`)}
              borderWidth="2px"
              borderStyle="dashed"
              borderRadius="md"
            >
              <VisuallyHidden>
                <input {...getInputProps()} />
              </VisuallyHidden>
              <Icon as={IoMdDownload} boxSize="10" />
              <Box textAlign="center">
                <Text fontWeight="bold" fontSize="lg">
                  Upload a picture of your face here
                </Text>
                <Text fontSize="md">We only accept .jpg</Text>
              </Box>
            </Stack>
          </Stack>
        </>
      )}
    </Dropzone>
  );
};
