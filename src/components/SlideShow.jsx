import * as React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import { DateRangeIcon } from "@mui/x-date-pickers";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/material/Button";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from "@mui/icons-material/Videocam";
import Stack from "@mui/material/Stack";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles?.("dark", {
    backgroundColor: "#1A2027",
  }),
}));
const handleChange = (event, newValue) => {
  alert(`You chose "${newValue}"`);
};

function SlideShow() {
  const card = (
    <React.Fragment>
      <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
  <Typography variant="h5" fontWeight="bold" sx={{ textAlign: "center", pb: 2 }}>
    Search Your Destinations
  </Typography>

  <FormLabel>Search:</FormLabel>
  <Input
    placeholder="Search..."
    startDecorator={<SearchIcon />}
    sx={{ borderRadius: 6, bgcolor: "#f5f5f5", p: 1 }}
  />

  <FormLabel>Select Your Date:</FormLabel>
  <Input
    type="date"
    startDecorator={<DateRangeIcon />}
    sx={{ borderRadius: 6, bgcolor: "#f5f5f5", p: 1 }}
  />

  <FormLabel>No. of Person:</FormLabel>
  <Select defaultValue="1" onChange={handleChange} sx={{ borderRadius: 6 }}>
    {[...Array(5)].map((_, i) => (
      <Option key={i + 1} value={`${i + 1}`}>
        {i + 1}
      </Option>
    ))}
  </Select>

  <Button
    sx={{
      width: "100%",
      backgroundColor: "rgb(5, 127, 228)",
      color: "white",
      borderRadius: 3,
      p: 1.5,
      fontSize: "1rem",
      fontWeight: "bold",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      "&:hover": { backgroundColor: "rgb(4, 107, 198)" },
    }}
  >
    Search
  </Button>
</CardContent>

    </React.Fragment>
  );
  const theme = createTheme({
    typography: {
      fontFamily: '"Dancing Script", sans-serif', // Жалпы шрифт түрі
      h3: {
        fontFamily: '"Dancing Script", sans-serif',
        fontWeight: 700,
      },
      h2: {
        fontFamily: '"Courier New", monospace',
      },
    },
  });

  return (
    <>
      <div className="bg-image">
        <Container fixed>
          <Box
            sx={{
              flexGrow: 1,
              paddingTop: 30,
              position: "relative", // Box элементін артқы фонға қатысты орналастыру үшін
              zIndex: 1, // Box элементі артқы фоннан жоғары тұр
            }}
          >
            <Grid container spacing={40} sx={{ flexGrow: 1 }}>
              <Grid item xs={12} sm={6}>
                <Item
                  sx={{
                    color: "white",
                    boxShadow: "none",
                    backgroundColor: "rgba(255, 255, 255, 0)",
                    justifyContent: "start",
                    textAlign: "left",
                  }}
                >
                  <ThemeProvider theme={theme}>
                    <Typography className="font-css" variant="h3" gutterBottom>
                      Find Your Ideal Stay
                    </Typography>
                  </ThemeProvider>
                  <Typography variant="h2" gutterBottom>
                    <b>Where Do You Want To Go?</b>
                  </Typography>
                  <Typography
                    color="grey"
                    variant="subtitle1"
                    fontSize={18}
                    gutterBottom
                  >
                    Planning for a trip? We will organize your trip with the
                    best places and within the best budget!
                  </Typography>
                  <Stack spacing={2} direction="row">
                    <Button variant="contained">View Packages</Button>
                    <IconButton
                      sx={{
                        backgroundColor: "rgb(5, 127, 228)",
                        color: "white",
                      }}
                      aria-label="video"
                      size="large"
                    >
                      <VideocamIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Item>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Item
                  sx={{
                    borderRadius: "25px",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <Card sx={{ borderRadius: 5 }} variant="outlined">
                    {card}
                  </Card>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "200px",
          mt: "-190px",
        }}
      >
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ height: "100%", width: "100%" }}
        >
          <path
            d="M-2.54,95.23 C222.63,199.84 369.35,37.02 501.97,99.19 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: "none", fill: "aliceblue" }}
          />
        </svg>
      </Box>
    </>
  );
}

export default SlideShow;
