import React from 'react'
import DatePicker from '../../components/Fields/DatePicker'
import Select from '../../components/Fields/Select'
import { Form, Field, Formik } from "formik";
import { Divider, Heading } from '@chakra-ui/react';
import TextField from '../../components/Fields/TextField';
import Radio from '../../components/Fields/Radio'


export default function CommunicableForm() {
    const diagnosisOpt = [
        { key: 'Select an option', value: '' },
        { key: 'HIV', value: 'HIV' },
        { key: 'Tuberculosis', value: 'Scratch' },
        { key: 'Scratch', value: 'Scratch' },
        { key: 'Scratch', value: 'Scratch' },
        { key: 'Scratch', value: 'Scratch' },
        { key: 'Saliva', value: 'Saliva' }
    ]
    const hospitalizedOpt = [
        { key: 'Yes', value: 'Yes' },
        { key: 'No', value: 'No' }

    ]
    return (
        <div >
            <Divider mt={5}/>
            <Formik>
                <Form>
                    <Heading size="md">
                        Communicable Diseases
                    </Heading>
                    <Select
                        label="Diagnosis"
                        name="diagnosis"
                        options={diagnosisOpt}
                    />
                    <DatePicker
                        name="onsetDate"
                        label="Onset Date"
                    />
                    <TextField
                        label="Guardian Name"
                        name="guardian"
                    />
                    <TextField
                        label="Patient workplace / School"
                        name="patientWorkplace"
                    />
                    <TextField
                        label="Patient workplace / School Address"
                        name="patientWorkplaceAddress"
                    />
                    <Radio
                        label="was hospitalized ?"
                        name="hostpitalized"
                        options={hospitalizedOpt}
                    />
                </Form>
            </Formik>
        </div>
    )
}
