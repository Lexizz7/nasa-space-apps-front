import { useState, useEffect } from "react";

import ImageField from "../components/ImageField/ImageField";
import Input from "../components/Input/Input";
import InputHealth from "../components/InputHealth/InputHealth";
import { Stack, Button, Modal, Paper, Typography } from "@mui/material";
import { InfoRounded } from "@mui/icons-material";
import WinPopup from "../components/WinPopup/WinPopup";
import useImage from "../hooks/useImage";
import useNames from "../hooks/useNames";
import Countdown from "../components/Countdown";

const compareDates = (obj) => {
  return obj.date == new Date().toLocaleDateString();
};

const Galatico = ({ enteringTab }) => {
  const [trys, setTrys] = useState(0);
  const [lives, setLives] = useState(5);
  const [localDataLoaded, setLocalDataLoaded] = useState(false);

  const { data: imageData, loading: loadingImageData, error: errorImageData } = useImage(trys, 1);
  const { data: namesData, loading: loadingNamesData, error: errorNamesData } = useNames(1);
  const [popup, setPopup] = useState(false);
  const [answer, setAnswer] = useState("");
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (imageData) {
      setAnswer(imageData.nome);
    }
  }, [imageData]);

  useEffect(() => {
    if (enteringTab && !localDataLoaded) {
      const localData = localStorage.getItem("galatico");
      if (localData) {
        const parsedData = JSON.parse(localData);
        if (compareDates(parsedData)) {
          setWin(parsedData.win);
          setLives(parsedData.lives);
          setTrys(parsedData.trys);
        }
      }
      setLocalDataLoaded(true);
    }
  }, [enteringTab]);

  useEffect(() => {
    if (localDataLoaded) {
      const dataToStorage = {
        win: win ?? false,
        lives: lives ?? 5,
        trys: trys ?? 0,
        date: new Date().toLocaleDateString(),
      };
      localStorage.setItem("galatico", JSON.stringify(dataToStorage));
    }
  }, [win, lives, trys]);

  return (
    <>
      <Stack
        style={{
          position: "relative",
        }}
        direction="column"
        alignItems="end"
        spacing={4}
      >
        <Button
          variant="contained"
          style={{
            color: "rgb(var(--text-color))",
            fontWeight: "bold",
            width: "max-content",
          }}
          startIcon={<InfoRounded />}
          color="secondary"
          onClick={() => setPopup(true)}
        >
          Como jogar
        </Button>
        <Stack direction="column" spacing={2}>
          <InputHealth lifes={lives} />
          <ImageField imageData={imageData} trys={trys} />
          <Input
            answer={answer}
            setLives={setLives}
            setZoom={setTrys}
            setWin={setWin}
            label="Procure um Astro"
            listData={namesData}
            loading={loadingNamesData}
          />
        </Stack>
        {win && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backdropFilter: "blur(2px)",
              margin: 0,
              zIndex: 99999,
            }}
          >
            <Paper
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "2rem",
                width: "90%",
                maxWidth: "800px",
              }}
            >
              <Stack direction="column" spacing={2}>
                <Typography variant="h5" sx={{ color: "rgb(var(--text-color))" }}>
                  Parabéns!
                </Typography>
                <Typography variant="body1" sx={{ color: "rgb(var(--text-color))" }}>
                  Você descobriu o astro em {trys} {trys === 1 ? "tentativa" : "tentativas"}.
                </Typography>
                <Button
                  size="large"
                  variant="contained"
                  style={{
                    width: "max-content",
                  }}
                >
                  Compartilhar meu resultado!
                </Button>
                <Typography variant="body1" sx={{ color: "rgb(var(--text-color))" }}>
                  O James Webb agradece sua ajuda!
                  <br />
                  <br />
                  {imageData?.descricao}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body1" sx={{ color: "rgb(var(--text-color))" }}>
                    Próximo desafio em:
                  </Typography>
                  <Countdown />
                </Stack>
              </Stack>
            </Paper>
          </div>
        )}
        {lives <= 0 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backdropFilter: "blur(2px)",
              margin: 0,
              zIndex: 99999,
            }}
          >
            <Paper
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "2rem",
                width: "90%",
                maxWidth: "800px",
              }}
            >
              <Stack direction="column" spacing={2}>
                <Typography variant="h5" sx={{ color: "rgb(var(--text-color))" }}>
                  Poxa, não foi dessa vez 😢
                </Typography>
                <Typography variant="body1" sx={{ color: "rgb(var(--text-color))" }}>
                  O astro era {answer}.
                </Typography>
                <Button
                  size="large"
                  variant="contained"
                  style={{
                    width: "max-content",
                  }}
                >
                  Compartilhar meu resultado!
                </Button>
                <Typography variant="body1" sx={{ color: "rgb(var(--text-color))" }}>
                  {imageData?.descricao}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body1" sx={{ color: "rgb(var(--text-color))" }}>
                    Próximo desafio em:
                  </Typography>
                  <Countdown />
                </Stack>
              </Stack>
            </Paper>
          </div>
        )}
      </Stack>
      <Modal open={popup} onClose={() => setPopup(false)}>
        <Paper
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "2rem",
            width: "90%",
            maxWidth: "800px",
          }}
        >
          <Stack direction="column" spacing={2}>
            <Typography variant="h5" sx={{ color: "rgb(var(--text-color))" }}>
              Introdução
            </Typography>
            <Typography variant="body1" sx={{ color: "rgb(var(--text-color))" }}>
              O novo telescópio espacial da NASA, o James Webb, foi lançado em 2021 e tem como
              objetivo descobrir novas galáxias e planetas. Para isso, o James Webb precisa de ajuda
              para encontrar os astros mais distantes.
            </Typography>
            <Typography variant="h5" sx={{ color: "rgb(var(--text-color))" }}>
              Como jogar
            </Typography>
            <Typography variant="body1" sx={{ color: "rgb(var(--text-color))" }}>
              Descubra qual é o astro que está na imagem com o menor número de tentativas.
              <br />
              <br />
              Pode ser nomes de galáxias, planetas ou constelações.
              <br />
              <br />
              Ao clicar em "Adivinhar", o James Webb irá te dizer se você acertou ou errou.
              <br />
              <br />
              Se você errar, o James Webb irá te dizer se o nome que você digitou está antes ou
              depois do nome correto e aumentar seu campo de visão.
            </Typography>
            <Button
              variant="contained"
              style={{
                color: "rgb(var(--text-color))",
                fontWeight: "bold",
              }}
              onClick={() => setPopup(false)}
            >
              Fechar
            </Button>
          </Stack>
        </Paper>
      </Modal>
    </>
  );
};

export default Galatico;
