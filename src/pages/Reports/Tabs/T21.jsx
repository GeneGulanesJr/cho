import {Center, Grid, GridItem, SimpleGrid, Text} from '@chakra-ui/layout'
import {Stat, StatGroup, StatHelpText, StatLabel, StatNumber} from '@chakra-ui/stat'
import React from 'react'
import IframeResizer from "iframe-resizer-react";

export default function T1() {
    return (
        <Grid borderWidth='1px' maxW="full" borderRadius="lg" p={5}>
            <IframeResizer
                log
                src="https://datastudio.google.com/embed/reporting/61c789d8-1730-4393-a276-8f4036d688b2/page/XvZiC"
                style={{ width: '1px', minWidth: '100%'}}
            />
        </Grid>
    )
}
