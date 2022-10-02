import { useState, useCallback, useEffect } from "react";
import ImageField from "../components/ImageField/ImageField";
import Input from "../components/Input/Input";
import InputHealth from "../components/InputHealth/InputHealth";
import { Stack, Button, Modal, Paper, Typography, Portal, ClickAwayListener } from "@mui/material";
import { KeyboardReturnRounded } from "@mui/icons-material";

import WinPopup from "../components/WinPopup/WinPopup";
import PlanetaTerra from "../assets/terra.jpg";

const planetas = [
  "Terra",
  "Marte",
  "Júpiter",
  "Saturno",
  "Urano",
  "Netuno",
  "Plutão",
  "Mercúrio",
  "Vênus",
];

const Tutorial = ({ setTab }) => {
  const [active, setActive] = useState(true);
  const [step, setStep] = useState(0);
  const [activeNodeTutorial, setActiveNodeTutorial] = useState(false);

  const [inputText, setInputText] = useState("");
  const [lifes, setLifes] = useState(2);

  const [answer, setAnswer] = useState("Terra");
  const [win, setWin] = useState(false);

  const [trys, setTrys] = useState([]);

  const [containerNode, setContainerNode] = useState(null);
  const container = useCallback((node) => {
    if (node !== null) setContainerNode(node);
  }, []);

  const [imageNode, setImageNode] = useState(null);
  const image = useCallback((node) => {
    if (node !== null) setImageNode(node);
  }, []);

  const [inputNode, setInputNode] = useState(null);
  const input = useCallback((node) => {
    if (node !== null) setInputNode(node);
  }, []);

  const [healthNode, setHealthNode] = useState(null);
  const health = useCallback((node) => {
    if (node !== null) setHealthNode(node);
  }, []);

  const [buttonNode, setButtonNode] = useState(null);
  const button = useCallback((node) => {
    if (node !== null) setButtonNode(node);
  }, []);

  const nextStep = () => {
    switch (step) {
      case 1: {
        if (inputText === "Marte") {
          setStep(step + 1);
        }
        break;
      }
      case 3: {
        if (inputText === "Marte") {
          setStep(step + 1);
        }
        break;
      }
      case 4: {
        if (inputText === "Terra") {
          setStep(step + 1);
        }
        break;
      }
      default: {
        setStep(step + 1);
        break;
      }
    }
  };

  const verifyAnswer = () => {
    if (step === 2) {
      setLifes(1);
      setStep(step + 1);
      setTrys([...trys, inputText]);
    }
  };

  useEffect(() => {
    if (!active) return;
    if (!containerNode) return;
    console.log("step", step);
    switch (step) {
      case 0: {
        if (imageNode) {
          setActiveNodeTutorial({
            node: imageNode,
            text: "Tente adivinhar que planeta é esse!",
            rect: imageNode.getBoundingClientRect(),
          });
          window.addEventListener("click", nextStep);
        }
        break;
      }
      case 1: {
        if (inputNode) {
          setActiveNodeTutorial({
            node: inputNode,
            text: "Digite 'Marte' e clique na tela",
            rect: inputNode.getBoundingClientRect(),
          });
          window.addEventListener("click", nextStep);
        }
        break;
      }
      case 2: {
        if (buttonNode) {
          setActiveNodeTutorial({
            node: buttonNode,
            text: "Clique aqui para tentar adivinhar",
            rect: buttonNode.getBoundingClientRect(),
          });
        }
        break;
      }
      case 3: {
        if (healthNode) {
          setActiveNodeTutorial({
            node: healthNode,
            text: "Veja que você só tem mais 1 tentativa",
            rect: healthNode.getBoundingClientRect(),
          });
          window.addEventListener("click", nextStep);
        }
        break;
      }
      case 4: {
        if (inputNode) {
          setActiveNodeTutorial({
            node: inputNode,
            text: "Digite 'Terra' e clique na tela",
            rect: inputNode.getBoundingClientRect(),
          });
          window.addEventListener("click", nextStep);
        }
        break;
      }
      case 5: {
        if (buttonNode) {
          setActiveNodeTutorial({
            node: buttonNode,
            text: "Clique aqui para tentar adivinhar",
            rect: buttonNode.getBoundingClientRect(),
          });
          window.addEventListener("click", nextStep);
        }
        break;
      }
      case 6: {
        setActiveNodeTutorial(false);
        window.removeEventListener("click", nextStep);
        setWin(true);
        break;
      }
    }

    return () => {
      window.removeEventListener("click", nextStep);
    };
  }, [step, active, containerNode, imageNode, inputNode, healthNode, buttonNode, inputText]);

  return (
    <>
      <Stack direction="column" alignItems="end" spacing={4}>
        <Stack direction="column" spacing={2}>
          <InputHealth forwardRef={health} lifes={lifes} />
          <Stack direction="row" spacing={2}>
            <div
              style={{
                backgroundColor: "rgb(var(--background-color-dark))",
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: "8px",
                overflow: "hidden",
                position: "relative",
              }}
              ref={image}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  objectFit: "cover",
                  top: 0,
                  left: 0,
                }}
                src={PlanetaTerra}
                alt="Planeta Terra"
              />
            </div>
          </Stack>
          <Input
            forwardRef={input}
            forwardRefButton={button}
            label="Procure um Planeta"
            listData={planetas}
            onChange={(e) => setInputText(e.target.value)}
            onClick={(e) => {
              if (step === 5) return;
              verifyAnswer();
              e.stopPropagation();
            }}
          />
        </Stack>
      </Stack>
      {active && (
        <Portal container={document.getElementById("tutorial-root")}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 998,
            }}
            ref={container}
          >
            {activeNodeTutorial && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: activeNodeTutorial.rect.y - 4,
                    left: activeNodeTutorial.rect.x - 4,
                    width: activeNodeTutorial.rect.width + 8,
                    height: activeNodeTutorial.rect.height + 8,
                    backgroundColor: "rgba(var(--primary-color), 0.1)",
                    border: "rgba(var(--primary-color), 0.5) 0.5rem solid",
                    borderRadius: "500px",
                    transition: "all 0.3s ease",
                  }}
                ></div>
                <Typography
                  style={{
                    position: "absolute",
                    bottom: `calc(100vh - ${activeNodeTutorial.rect.y - 50}px)`,
                    left: activeNodeTutorial.rect.x,
                    width: activeNodeTutorial.rect.width,
                    textAlign: "center",
                    color: "rgb(var(--primary-color))",
                    fontweight: "bold",
                    textShadow: "2px 2px 2px black",
                    transition: "all 0.3s ease",
                  }}
                  variant="body1"
                >
                  {activeNodeTutorial.text}
                </Typography>
                <KeyboardReturnRounded
                  style={{
                    position: "absolute",
                    bottom: `calc(100vh - ${activeNodeTutorial.rect.y - 16}px)`,
                    left: activeNodeTutorial.rect.x,
                    width: activeNodeTutorial.rect.width,
                    filter: "drop-shadow(-2px -2px 2px black)",
                    transform: "rotate(-90deg)",
                    transition: "all 0.3s ease",
                  }}
                  fontSize="large"
                  color="primary"
                />
                <Typography
                  variant="h5"
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: "3rem",
                    transform: "translateX(-50%)",
                    width: "max-content",
                  }}
                >
                  Clique em qualquer lugar para continuar
                </Typography>
              </>
            )}
          </div>
        </Portal>
      )}
      <WinPopup title="Parabéns" open={win} onClose={() => setWin(false)}>
        <Typography variant="body1">Você encontrou o planeta Terra!</Typography>
        <Stack direction="row" justifyContent="end" alignItems="center" spacing={2}>
          <Button
            variant="contained"
            color="secondary"
            style={{
              fontWeight: "bold",
            }}
            onClick={(e) => {
              setWin(false);
              setStep(0);
              setInputText("");
              setLifes(2);
              e.stopPropagation();
            }}
          >
            Repetir tutorial
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setTab(1);
            }}
            style={{
              fontWeight: "bold",
              color: "rgb(var(--text-color))",
            }}
          >
            Ir para o desafio diário
          </Button>
        </Stack>
      </WinPopup>
    </>
  );
};

export default Tutorial;
