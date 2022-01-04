import {Center, Grid, GridItem, SimpleGrid} from '@chakra-ui/layout'
import {Stat, StatGroup, StatHelpText, StatLabel, StatNumber} from '@chakra-ui/stat'
import React from 'react'
import IframeResizer from "iframe-resizer-react";

export default function T26() {
    return (
        <Grid borderWidth='1px' maxW="full" borderRadius="lg" p={5}>
            <IframeResizer
                log
                src="https://datastudio.google.com/embed/reporting/a70388d2-6602-4832-949d-83aa720cc581/page/2vZiC"
                style={{ width: '1px', minWidth: '100%'}}
            />
        </Grid>
    )
}
