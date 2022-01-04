import {Center, Grid, GridItem, SimpleGrid, Text} from '@chakra-ui/layout'
import {Stat, StatGroup, StatHelpText, StatLabel, StatNumber} from '@chakra-ui/stat'
import React from 'react'
import IframeResizer from "iframe-resizer-react";

export default function T7() {
    return (
        <Grid borderWidth='1px' maxW="full" borderRadius="lg" p={5}>
            <IframeResizer
                log
                src="https://datastudio.google.com/embed/reporting/a68407cf-5c04-42bc-9128-297645f827ab/page/AuZiC"
                style={{ width: '1px', minWidth: '100%'}}
            />
        </Grid>
    )
}
