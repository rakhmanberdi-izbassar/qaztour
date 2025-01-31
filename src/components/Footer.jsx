import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Container } from "@mui/material"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Input from '@mui/joy/Input';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';


export default function Footer(){
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      }));
    return(
        <>
        <div className='footer'>
        <Container sx={{paddingTop: 10, paddingBottom: 10}}>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }}>
                
                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                    <Item sx={{
                        color: 'white', 
                        boxShadow: "none",
                        backgroundColor: "rgba(255, 255, 255, 0)", 
                        justifyContent:'start',
                        textAlign: 'left' 
                    }}>
                    Planning for a trip? We will organize your trip with the best places and within best budget!
                    </Item>
                </Grid>

                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                    <Item sx={{
                        color: 'white', 
                        boxShadow: "none",
                        backgroundColor: "rgba(255, 255, 255, 0)", 
                        justifyContent:'start',
                        textAlign: 'left' 
                    }}>
                        <h3>Office</h3>
                        Travosy Tour & Travels<br/>
                        C/54 Northwest Freeway,<br/>
                        Suite 558,<br/>
                        Houston, USA 485<br/>
                        contact@example.com<br/>
                        +152 534-468-854<br/>
                    </Item>
                </Grid>

                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                    <Item sx={{
                        color: 'white', 
                        boxShadow: "none",
                        backgroundColor: "rgba(255, 255, 255, 0)", 
                        justifyContent:'start',
                        textAlign: 'left' 
                    }}>
                    Company<br/>
                    About us<br/>
                    Services<br/>
                    Team<br/>
                    Pricing<br/>
                    Blog<br/>
                    Login<br/>
                    </Item>
                </Grid>

                <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                    <Item sx={{
                        color: 'white', 
                        boxShadow: "none",
                        backgroundColor: "rgba(255, 255, 255, 0)", 
                        justifyContent:'start',
                        textAlign: 'left' 
                    }}>
                    Newsletter<br/>
                    Sign up and receive the latest tips via email.<br/>

                    Write your email *<br/>
                    <Input 
                    startDecorator={<MailIcon />}
                        placeholder="Email"
                        sx={{
                            '&::before': {
                            display: 'none',
                            },
                            '&:focus-within': {
                            outline: '2px solid var(--Input-focusedHighlight)',
                            outlineOffset: '2px',
                            },
                        }}
                        />
                        <br/>
                        <Button
                        fullWidth variant="contained">Submit</Button>
                    </Item>
                </Grid>
                
            </Grid>
            </Box>
        </Container>
        </div>
        </>
    )
}