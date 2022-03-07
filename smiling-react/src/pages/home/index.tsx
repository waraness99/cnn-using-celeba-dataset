import React, { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import {
  Button,
  Img,
  Stack,
  Text,
  useToast,
  useColorModeValue as mode,
  SimpleGrid,
  Badge,
  useDisclosure,
  Link,
} from "@chakra-ui/react";

import { PageLayout } from "src/components/Layout/Pages/PageLayout.component";
import { Section } from "src/components/Layout/Section/Section.component";
import { H1 } from "src/components/Text/Titles.component";
import { ImageUploader } from "./components/ImageUploader.component";
import { LoadModel } from "./components/LoadModel.component";

import * as tf from "@tensorflow/tfjs";
import ImageCropper from "./components/ImageCropper.component";

const Home: NextPage = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const toast = useToast();
  const canvasRef = useRef(null);

  const modelUrl =
    "https://firebasestorage.googleapis.com/v0/b/waraness.appspot.com/o/model.json?alt=media&token=3489e669-9395-42fe-b0e7-f3f465d8991d";
  const [model, setModel] = useState<any>();
  const [tmpImageSrc, setTmpImageSrc] = useState<string>();
  const [imageSrc, setImageSrc] = useState<string>();
  const [prediction, setPrediction] = useState<number>();

  const onBeginUpload = (files: File[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setTmpImageSrc(reader.result as string);
      onToggle();
    };
    reader.onerror = (error) => {
      toast({
        title: "An error ocurred while uploading your file...",
        status: "error",
        isClosable: true,
      });
      console.log("An error occurred while uploading your file: " + error);
    };
  };

  const onUpload = (file: string | Blob) => {
    const url = URL.createObjectURL(file as Blob);
    setImageSrc(url);
    console.log(url);
  };

  const drawImageOnCanvas = (
    image: CanvasImageSource | OffscreenCanvas,
    canvas: any,
    ctx: CanvasRenderingContext2D | null,
  ) => {
    canvas.style.width = "100%";
    canvas.style.height = "440px";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  };

  const onImageChange = async ({ target }) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = (canvas as HTMLCanvasElement).getContext("2d");
      drawImageOnCanvas(target, canvas, ctx);

      const tensor = tf.browser.fromPixels(canvas); // Convert the image data to a tensor
      const resized = tf.image.resizeBilinear(tensor, [64, 64]).toFloat();
      const batched = resized.expandDims(0); // Add a dimension to get a batch shape

      const prediction = await model!.predict(batched).dataSync();
      console.log("Prediction: " + prediction[0]);
      setPrediction(prediction[0]);
    }
  };

  const interpretingPrediction = () => {
    let interpretation = "";

    if (prediction < 0.5) {
      interpretation = "Why so serious?";
    } else {
      interpretation = "What a beautiful smile!";
    }

    return interpretation;
  };

  const removePicture = () => {
    setImageSrc("");
  };

  const onCloseCropper = () => {
    setTmpImageSrc("");
    onClose();
  };

  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await tf.loadLayersModel(modelUrl);
        console.log("Successfully loaded model ");
        setModel(model);
      } catch (err) {
        console.log(err);
      }
    };
    loadModel();
  }, []);

  return (
    <>
      <PageLayout>
        <Section>
          <Stack spacing="6" mb="16">
            <H1>
              Are you{" "}
              <H1 as="span" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
                Smiling
              </H1>
              ?
            </H1>
            <Text color={mode(`gray.500`, `whiteAlpha.800`)}>
              {`Let our Artificial Intelligence detect when you're smiling. Test it out now by uploading a photo of your
            face.`}
            </Text>
          </Stack>

          {model ? (
            !imageSrc ? (
              <ImageUploader onUpload={onBeginUpload} />
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
                <canvas className="classified-image" ref={canvasRef}>
                  {imageSrc && <Img alt="preview" onLoad={onImageChange} src={imageSrc} />}
                </canvas>

                <Stack spacing="6">
                  <Stack shouldWrapChildren>
                    {prediction < 0.5 ? (
                      <Badge colorScheme="red" fontSize="md">
                        Not smiling
                      </Badge>
                    ) : (
                      <Badge colorScheme="green" fontSize="md">
                        Smiling
                      </Badge>
                    )}

                    <Text>{interpretingPrediction()}</Text>
                    <Text fontSize="md" color={mode(`gray.500`, `whiteAlpha.800`)}>
                      To learn more about how the model works, you can check the source code on our{" "}
                      <Link href="https://github.com" isExternal>
                        GitHub repository
                      </Link>
                      .
                    </Text>
                  </Stack>
                  <Button onClick={() => removePicture()}>Try with another picture</Button>
                </Stack>
              </SimpleGrid>
            )
          ) : (
            <LoadModel />
          )}
        </Section>
      </PageLayout>
      <ImageCropper
        src={tmpImageSrc || ""}
        onAction={onUpload}
        isOpen={isOpen}
        onClose={onCloseCropper}
        initialAspectRatio={1}
        aspectRatio={1}
      />
    </>
  );
};
export default Home;
