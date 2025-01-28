import * as React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import { DateRangeIcon } from "@mui/x-date-pickers";
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

// Paper компонентіне арналған стиль
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
  // const [selectedDate, setSelectedDate] = useState(null); 
  const card = (
    <React.Fragment >
      <CardContent>
      <FormLabel sx={{paddingBottom:2}}>
          Search:
        </FormLabel>
        <Input placeholder="Search..." startDecorator={<SearchIcon />} />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        
          label="Select Your Day"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                "--Input-focusedThickness": "25px",
                "--Input-gap": "24px",
                "--Input-placeholderOpacity": 1
              }}
            />
          )}
        />
      </LocalizationProvider> */}
      <FormLabel
         sx={{paddingBottom:2, paddingTop:2}} 
        >
          Select Your Date:
        </FormLabel>
      <Input placeholder="Select Your Date" startDecorator={<DateRangeIcon/>} />
      <FormLabel
          sx={{paddingBottom:2, paddingTop:2}}
        >
          Select Your Date:
        </FormLabel>
      <Input placeholder="Select Your Date" startDecorator={<DateRangeIcon />} />
      <FormLabel
          sx={{paddingBottom:2, paddingTop:2}}
        >
          No. of Person:

        </FormLabel>
      <Select defaultValue="1" onChange={handleChange}>
      <Option value="1">1</Option>
      <Option value="2">2</Option>
      <Option value="3">3</Option>
      <Option value="4">4</Option>
      <Option value="5">5</Option>
    </Select>


      </CardContent>
      <CardActions></CardActions>
    </React.Fragment>
  );

  return (
    <>
      <div className="bg-image">
        <Container fixed>
          <Box sx={{ flexGrow: 1, paddingTop: 50 }}>
            <Grid  container spacing={5}  sx={{ flexGrow: 1 }}>
              <Grid item xs={12} sm={6}>
                <Item sx={{color:'white', boxShadow:"none",
                    backgroundColor: "rgba(255, 255, 255, 0)"
                  }}>
                  <Typography variant="h3" gutterBottom>
                    Find Your Ideal Stay
                  </Typography>
                  <Typography variant="h2" gutterBottom>
                    Where Do You Want To Go?
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Planning for a trip? We will organize your trip with the best places and within the best budget!
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Item sx={{borderRadius: '25px'}}>
                  <Card sx={{borderRadius:5}} variant="outlined">{card}</Card>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
}

export default SlideShow;
