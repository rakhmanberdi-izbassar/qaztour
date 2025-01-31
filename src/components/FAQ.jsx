import React from 'react'
import { Container } from '@mui/material'
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import myImage from './../assets/photos/traveller-bag-mountains-isolation-1151553.jpg'


function FAQ() {
  const Item = styled(Paper)(({ theme }) => ({
    borderRadius:'15px',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
    
    }),
  }));

  return (
    <>
      <Container sx={{paddingBottom: 5}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
            <img src={myImage} alt="a FAQ" style={{ width: "100%", borderRadius: 10 }} />
            </Grid>
          
            <Grid size={6}>
              <Item>
                <AccordionGroup
                variant="outlined"
                transition="0.2s"
                sx={(theme) => ({
                  maxWidth: "100%",
                  borderRadius: '12px',
                  [`& .${accordionSummaryClasses.button}:hover`]: {
                    bgcolor: 'transparent',
                  },
                  [`& .${accordionDetailsClasses.content}`]: {
                    boxShadow: `inset 0 1px ${theme.vars.palette.divider}`,
                    [`&.${accordionDetailsClasses.expanded}`]: {
                      paddingBlock: '0.75rem',
                    },
                  },
                })}
              >
                <Accordion defaultExpanded>
                  <AccordionSummary>First accordion</AccordionSummary>
                  <AccordionDetails variant="soft">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary>Second accordion</AccordionSummary>
                  <AccordionDetails variant="soft">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary>Third accordion</AccordionSummary>
                  <AccordionDetails variant="soft">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                  <AccordionSummary>First accordion</AccordionSummary>
                  <AccordionDetails variant="soft">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                  <AccordionSummary>First accordion</AccordionSummary>
                  <AccordionDetails variant="soft">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                  <AccordionSummary>First accordion</AccordionSummary>
                  <AccordionDetails variant="soft">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </AccordionDetails>
                </Accordion>
              </AccordionGroup>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default FAQ
