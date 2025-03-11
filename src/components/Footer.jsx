import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Container, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Input from '@mui/joy/Input';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';

export default function Footer() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: 'transparent',
        color: '#fff',
        padding: theme.spacing(2),
        textAlign: 'left',
        boxShadow: 'none',
    }));

    return (
        <Box sx={{ position: 'relative', backgroundColor: '#002569', color: 'white', paddingTop: 12, paddingBottom: 10, mt: 5 }}>
            

            <Box sx={{ position: 'absolute', top: -110, left: 0, width: '100%', height: '120px', marginTop: "-1px" }}>
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}>
                    <path d="M-2.54,95.23 C222.63,199.84 369.35,37.02 501.97,99.19 L500.00,150.00 L0.00,150.00 Z" 
                    style={{ stroke: "none", fill: "#002569" }} />
                </svg>
            </Box>

            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Item>
                            <Typography variant="h6">About Us</Typography>
                            <Typography variant="body2">
                                Planning for a trip? We will organize your trip with the best places and within best budget!
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Item>
                            <Typography variant="h6">Office</Typography>
                            <Typography variant="body2">
                                Travosy Tour & Travels<br />
                                C/54 Northwest Freeway,<br />
                                Suite 558, Houston, USA 485<br />
                                contact@example.com<br />
                                +152 534-468-854
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Item>
                            <Typography variant="h6">Company</Typography>
                            <Typography variant="body2">
                                About us<br />
                                Services<br />
                                Team<br />
                                Pricing<br />
                                Blog<br />
                                Login
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Item>
                            <Typography variant="h6">Newsletter</Typography>
                            <Typography variant="body2">Sign up and receive the latest tips via email.</Typography>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2 }}>
                                <Input
                                    startDecorator={<MailIcon />}
                                    placeholder="Your email"
                                    sx={{ width: '100%', backgroundColor: '#fff', borderRadius: 6 }}
                                />
                                <Button variant="contained" sx={{ width: 200, backgroundColor: '#ff9800', color: '#fff' }}>
                                    Subscribe
                                </Button>
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
