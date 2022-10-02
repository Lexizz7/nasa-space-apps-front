import { useState, useEffect, useCallback } from "react";

import styles from "./ImageField.module.css";

import { Stack, IconButton, Slider } from "@mui/material";

const returnGridTemplateArea = (index) => {
  switch (index) {
    case 0:
      return `"a"`;
    case 1:
      return `"a b" "f g"`;
    case 2:
      return `"a b c" "f g h" "k l m"`;
    case 3:
      return `"a b c d" "f g h i" "k l m n" "p q r s"`;
    case 4:
      return `"a b c d e" "f g h i j" "k l m n o" "p q r s t" "u v w x y"`;
  }
};

const ImageField = ({ imageData, trys }) => {
  const [zoomOut, setZoomOut] = useState(trys ?? 0);
  const [allImages, setAllImages] = useState([]);
  const [imageContainerNode, setImageContainerNode] = useState(null);
  const imageContainer = useCallback((node) => {
    if (node !== null) {
      setImageContainerNode(node);
    }
  }, []);

  useEffect(() => {
    setZoomOut(trys ?? 0);
  }, [trys]);

  useEffect(() => {
    if (imageData) {
      imageData.img.forEach((img) => {
        setAllImages((prev) =>
          [...prev, img].filter((v, i, a) => a.findIndex((t) => t.uuid === v.uuid) === i)
        );
      });
    }
  }, [imageData]);

  return (
    <>
      <Stack direction="row" spacing={2}>
        <div
          className={styles.container}
          style={{
            overflow: "hidden",
            position: "relative",
          }}
          ref={imageContainer}
        >
          {allImages.length > 0 && imageContainerNode && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  display: "grid",
                  gridTemplateAreas: returnGridTemplateArea(zoomOut),
                  width: "100%",
                  height: "100%",
                  transform: `scale(${1 / (zoomOut + 1)})`,
                  transformOrigin: "top left",
                  transition: "transform 0.5s ease",
                }}
              >
                {allImages.map((img) => {
                  return (
                    <img
                      key={img.uuid}
                      style={{
                        width: imageContainerNode.getBoundingClientRect().width,
                        height: imageContainerNode.getBoundingClientRect().height,
                        gridArea: `${String.fromCharCode(96 + img.id)}`,
                      }}
                      src={`data:image/jpeg;base64,${img.img}`}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
        <Stack direction="column" spacing={1} alignItems="center">
          <Slider disabled orientation="vertical" value={100 - zoomOut * 25} />
        </Stack>
      </Stack>
    </>
  );
};

export default ImageField;
