import {Center, Grid, GridItem, SimpleGrid, Text} from '@chakra-ui/layout'
import {Stat, StatGroup, StatHelpText, StatLabel, StatNumber} from '@chakra-ui/stat'
import React from 'react'
import IframeResizer from "iframe-resizer-react";

export default function T5() {
    return (
        <Grid borderWidth='1px' maxW="full" borderRadius="lg" p={5}>
            <IframeResizer
            log
            src="https://datastudio.google.com/embed/reporting/d1a7eb34-fb55-4e43-9094-1e63377d476f/page/ztZiC"
            style={{ width: '1px', minWidth: '100%'}}
        /></Grid>
    )
}
