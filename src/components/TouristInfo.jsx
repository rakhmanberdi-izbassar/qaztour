import * as React from "react";
import { Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { TravelExplore, Language, LocalDining, Security, DirectionsCar, MedicalServices } from "@mui/icons-material";

const infoItems = [
  { icon: <TravelExplore fontSize="large" />, title: "Визалық талаптар", desc: "Туристік визалар, құжаттар және шекаралық ережелер туралы мәліметтер." },
  { icon: <Language fontSize="large" />, title: "Тілдік кедергілер", desc: "Негізгі фразалар, аударма қосымшалары және тілдік көмек қызметтері." },
  { icon: <LocalDining fontSize="large" />, title: "Жергілікті тағамдар", desc: "Қандай дәстүрлі тағамдарды көру керек және қай жерлерде дәм татуға болады." },
  { icon: <Security fontSize="large" />, title: "Қауіпсіздік шаралары", desc: "Туристер үшін қауіпсіздік бойынша кеңестер мен ережелер." },
  { icon: <DirectionsCar fontSize="large" />, title: "Көлік және бағыттар", desc: "Қоғамдық көлік, жалға беру қызметтері және навигация кеңестері." },
  { icon: <MedicalServices fontSize="large" />, title: "Медициналық көмек", desc: "Дәріханалар, ауруханалар және шұғыл медициналық байланыс нөмірлері." },
];

export default function TouristInfo() {
  return (
    <Box sx={{ background: "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)", py: 8 }}>
      <Container>
        <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", color: "white", mb: 4 }}>
          Турист үшін пайдалы ақпарат
        </Typography>
        <Grid container spacing={4}>
          {infoItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ p: 3, textAlign: "center", borderRadius: 3, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                <Box sx={{ color: "#0077b6", mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" fontWeight="bold">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
