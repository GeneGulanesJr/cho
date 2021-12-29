import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    GridItem,
    HStack,
    SimpleGrid,
    Spacer,
    Text,
} from '@chakra-ui/react';

import React, {useState} from 'react'
import * as Yup from "yup";
import {Form, Formik} from 'formik';
import TextField from '../../../components/Fields/TextField';
import Radio from '../../../components/Fields/Radio';
import FormHeading from '../../../components/Labels/FormHeading';
import DatePicker from '../../../components/Fields/DatePicker';
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../../../utils/init-firebase";

export default function Figure4({works}) {


    const data5 = JSON.parse(JSON.stringify({works}))

    const conf =     data5.works.Figure4.conforme.date.seconds
    const newconf = new Date(conf*1000)

    const [data, setData] = useState({
        attendantName:  data5.works.Figure4.attendantName,
        deliveryLocation: data5.works.Figure4.deliveryLocation,
        accredationStatus: data5.works.Figure4.accredationStatus,
        distanceFromResidence: data5.works.Figure4.distanceFromResidence,
        estimatedCost: data5.works.Figure4.estimatedCost,
        modeOfPayment: data5.works.Figure4.modeOfPayment,

        availableTransportation: data5.works.Figure4.availableTransportation,
        bringer: {
            Name: data5.works.Figure4.bringer.Name,
            Address: data5.works.Figure4.bringer.Address,
            Number: data5.works.Figure4.bringer.Number,
        },
        companion: {
            Name: data5.works.Figure4.companion.Name,
            Relationship: data5.works.Figure4.companion.Relationship,
            Address: data5.works.Figure4.companion.Address,
            Number: data5.works.Figure4.companion.Number,
        },
        careTaker: {
            Name: data5.works.Figure4.careTaker.Name,
            Relationship: data5.works.Figure4.careTaker.Relationship,
        },

        bloodType: data5.works.Figure4.bloodType,
        donors: {
            donorName1: data5.works.Figure4.donors.donorName1,
            donorAddress1:  data5.works.Figure4.donors.donorAddress1,
            donorName2:  data5.works.Figure4.donors.donorName2,
            donorAddress2:  data5.works.Figure4.donors.donorAddress2
        },
        complicationReferral: {
            name:  data5.works.Figure4.complicationReferral.name,
            address: data5.works.Figure4.complicationReferral.address,
            number: data5.works.Figure4.complicationReferral.number
        },

        maternalHostpital: {
            name: data5.works.Figure4.maternalHostpital.name,
            address: data5.works.Figure4.maternalHostpital.address,
        },
        newbornHostpital: {
            name: data5.works.Figure4.newbornHostpital.name,
            address: data5.works.Figure4.newbornHostpital.address,
        },
        conforme: {
            signature: data5.works.Figure4.conforme.signature,
            date: newconf
        }
    });
    const [currentStep, setCurrentStep] = useState(0);
    const makeRequest = (formData) => {
        console.log("Form Submitted", formData);
        updateUsers(formData);
    };

    async  function updateUsers(formData) {
        const documentId = JSON.parse(JSON.stringify(works.id))
        const userRef = doc(db, 'client', documentId);
        await  updateDoc(userRef,{
            Figure4: formData

        }).then(() => {
            alert("Form Updated Successfully")
        }).catch(function (error) {
            console.error("Error writing document: In Figure 5 ", error);
        });
    }



    const handleNextStep = (newData, final = false) => {
        setData((prev) => ({ ...prev, ...newData }));
        if (final) {
            makeRequest(newData);
            return;
        }
        setCurrentStep((prev) => prev + 1);
    };
    const handlePrevStep = (newData) => {
        setData((prev) => ({ ...prev, ...newData }));
        setCurrentStep((prev) => prev - 1);
    };
    const steps = [
        <StepOne next={handleNextStep} data={data} />,
        <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
        <StepThree next={handleNextStep} prev={handlePrevStep} data={data} />,
        <StepFour next={handleNextStep} prev={handlePrevStep} data={data} />
    ];
    console.log("data", data);
    return <div className="App">{steps[currentStep]}</div>;
}

const stepOneValidationSchema = Yup.object({
});
const StepOne = (props) => {
    const handleSubmit = (values) => {
        props.next(values);
    };
    const accredationStatusOpt = [
        { key: 'Yes', value: 'yes' },
        { key: 'no', value: 'no' }
    ];
    return (
        <Box boxShadow={'lg'} p={10}>
            <Formik
                validationSchema={stepOneValidationSchema}
                initialValues={props.data}
                onSubmit={handleSubmit}>
                {() => (
                    <Form>
                        <FormControl>
                            <SimpleGrid columns={1} spacingY={4}>
                                <FormHeading text="BIRTH PLAN" />
                                <Text>
                                    I know that any complication can develop at any time in the course of
                                    this pregnancy, childbirth and after birth. I know that the best place
                                    to deliver my baby is in a health facility.
                                </Text>
                                <div>
                                    <TextField
                                        label="I will be attended at delivery by"
                                        name="attendantName"
                                    />
                                    <FormHelperText>
                                        Name of Doctor/Nurse/Midwife or others. If others, pls. specify
                                    </FormHelperText>
                                </div>
                                <div>
                                    <TextField
                                        label="I plan to deliver at"
                                        name="deliveryLocation"
                                    />
                                    <FormHelperText>
                                        Name and location of Hospital/health center/clinic or others.
                                        If others, pls. specify
                                    </FormHelperText>
                                </div>
                                <SimpleGrid columns={2}>
                                    <GridItem>
                                        <Radio
                                            label="This is a Philhealth accredited facility"
                                            name="accredationStatus"
                                            options={accredationStatusOpt}
                                        />
                                    </GridItem>
                                    <GridItem>
                                        <TextField
                                            label="Distance from Residence"
                                            name="distanceFromResidence"
                                        />
                                    </GridItem>
                                </SimpleGrid>
                                <SimpleGrid columns={3} spacingX={3}>
                                    <GridItem colSpan={2} >
                                        <TextField
                                            label="The estimated cost of the
                                            maternity package in this facility is"
                                            name="accredationStatus"
                                        />
                                        <FormHelperText>
                                            Inclusive of the newborn care package
                                        </FormHelperText>
                                    </GridItem>
                                    <GridItem>
                                        <TextField
                                            label="The mode of payment is"
                                            name="modeofPayment"
                                        />
                                    </GridItem>
                                </SimpleGrid>
                            </SimpleGrid>
                        </FormControl>
                        <HStack mt={5}>
                            <Spacer />
                            <Button type="submit" colorScheme='blue'>Next</Button>
                        </HStack>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

const stepTwoValidationSchema = Yup.object({
    // availableTransportation: Yup.string(),
    // bringer: Yup.object({
    //     Name: Yup.string(),
    //     Address: Yup.string(),
    //     Number: Yup.string(),
    // }),
    // companion: Yup.object({
    //     Name: Yup.string(),
    //     Relationship: Yup.string(),
    //     Address: Yup.string(),
    //     Number: Yup.string(),
    // }),
    // careTaker: Yup.object({
    //     Name: Yup.string(),
    //     Relationship: Yup.string(),
    // })
});
const StepTwo = (props) => {
    const handleSubmit = (values) => {
        props.next(values);
    };
    return (
        <Box boxShadow={'lg'} p={10}>
            <Formik
                validationSchema={stepTwoValidationSchema}
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form>
                        <FormControl>
                            <SimpleGrid spacingY={5}>
                                <SimpleGrid columns={3} spacingX={4}>
                                    <GridItem >
                                        <TextField
                                            label="The available transport is"
                                            name="availableTransportation"
                                        />
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <TextField
                                            label="I have contacted "
                                            name="bringer.Name"
                                        />
                                        <FormHelperText>
                                            Name of Companion
                                        </FormHelperText>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <div>
                                            <TextField
                                                label="residing at"
                                                name="bringer.Address"
                                            />
                                            <FormHelperText>
                                                Address
                                            </FormHelperText>
                                        </div>
                                    </GridItem>
                                    <GridItem>
                                        <div>
                                            <TextField
                                                label="and with contact number at"
                                                name="bringer.Number"
                                            />
                                            <FormHelperText>
                                                Landline or Cellphone
                                            </FormHelperText>
                                        </div>
                                    </GridItem>
                                    <GridItem colSpan={3}>
                                        <Text>
                                            to bring me to the hospital/maternity clinic/health center.
                                        </Text>
                                    </GridItem>
                                </SimpleGrid>
                                <Divider />
                                <SimpleGrid columns={3} spacingX={4}>
                                    <GridItem colSpan={2}>
                                        <TextField
                                            label="I will be accompanied by"
                                            name="companion.Name"
                                        />
                                        <FormHelperText>
                                            Name
                                        </FormHelperText>
                                    </GridItem>
                                    <GridItem >
                                        <TextField
                                            label="who is my "
                                            name="companion.Relationship"
                                        />
                                        <FormHelperText>
                                            Relationship to patient
                                        </FormHelperText>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <TextField
                                            label="residing at"
                                            name="companion.Address"
                                        />
                                        <FormHelperText>
                                            Address
                                        </FormHelperText>
                                    </GridItem>
                                    <GridItem>
                                        <TextField
                                            label="with contact number at"
                                            name="companion.Number"
                                        />
                                        <FormHelperText>
                                            Landline or Cellphone
                                        </FormHelperText>
                                    </GridItem>
                                </SimpleGrid>
                                <Divider />
                                <SimpleGrid columns={3} spacingX={4}>
                                    <GridItem colSpan={2}>
                                        <TextField
                                            label="Name of care taker"
                                            name="careTaker.Name"
                                        />
                                    </GridItem>
                                    <GridItem >
                                        <TextField
                                            label="my"
                                            name="careTaker.Relationship"
                                        />
                                        <FormHelperText>
                                            Relationship to patient
                                        </FormHelperText>
                                    </GridItem>
                                    <GridItem colSpan={3}>
                                        <Text>
                                            will take care of my children/home while I am in the health facility
                                        </Text>
                                    </GridItem>
                                </SimpleGrid>
                            </SimpleGrid>
                        </FormControl>
                        <HStack mt={5}>
                            <Spacer />
                            <Button type="button" colorScheme='blue' onClick={() => props.prev(values)} >
                                Back
                            </Button>
                            <Button type="submit" colorScheme='blue'>Next</Button>
                        </HStack>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};


const stepThreeValidationSchema = Yup.object({
    // bloodType: Yup.string(),
    // donors: Yup.object({
    //     donorName1: Yup.string(),
    //     donorAddress1: Yup.string(),
    //     donorName2: Yup.string(),
    //     donorAddress2: Yup.string()
    // }),
    // complicationReferral: Yup.object({
    //     name: Yup.string(),
    //     address: Yup.string(),
    //     number: Yup.string()
    // })
});
const StepThree = (props) => {
    const handleSubmit = (values) => {
        props.next(values);
    };

    return (
        <Box boxShadow={'lg'} p={10}>
            <Formik
                validationSchema={stepThreeValidationSchema}
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form>
                        <FormControl>
                            <SimpleGrid  spacingY={5}>
                                <GridItem>
                                    <TextField
                                        name="bloodType"
                                        label="My blood type is"
                                    />
                                </GridItem>
                                <SimpleGrid columns={2} spacingX={5}>
                                    <GridItem colSpan={2}>
                                        <Text>
                                            In case of a need for blood transfusion, my possible donors are:
                                        </Text>
                                    </GridItem>
                                    <GridItem>
                                        <TextField label="Name" name="donors.donorName1" />
                                    </GridItem>
                                    <GridItem>
                                        <TextField label="Address" name="donors.donorAddress1" />
                                    </GridItem>
                                    <GridItem>
                                        <TextField label="Name" name="donors.donorName2" />
                                    </GridItem>
                                    <GridItem>
                                        <TextField label="Address" name="donors.donorAddress2" />
                                    </GridItem>
                                </SimpleGrid>
                                <SimpleGrid columns={3} spacingX={5}>
                                    <GridItem colSpan={3}>
                                        <Text>
                                            In case incase of complications, I should be referred right away to:
                                        </Text>
                                    </GridItem>
                                    <GridItem>
                                        <TextField label="Contact Person" name="complicationReferral.name" />
                                    </GridItem>
                                    <GridItem>
                                        <TextField label="Address" name="complicationReferral.address" />
                                    </GridItem>
                                    <GridItem>
                                        <TextField label="Tel. No" name="complicationReferral.number" />
                                    </GridItem>
                                </SimpleGrid>
                            </SimpleGrid>
                            <HStack mt={5}>
                                <Spacer />
                                <Button type="button" colorScheme='blue' onClick={() => props.prev(values)} >
                                    Back
                                </Button>
                                <Button type="submit" colorScheme='blue'>Next</Button>
                            </HStack>
                        </FormControl>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};


const stepFourValidationSchema = Yup.object({
    // maternalHostpital: Yup.object({
    //     name: Yup.string(),
    //     address: Yup.string(),
    // }),
    // newbornHostpital: Yup.object({
    //     name: Yup.string(),
    //     address: Yup.string(),
    // }),
    // conforme: Yup.object({
    //     signature: Yup.string(),
    //     date: Yup.date()
    // })
});
const StepFour = (props) => {
    const handleSubmit = (values) => {
        props.next(values, true);
    };
    return (
        <Box boxShadow={'lg'} p={10}>
            <Formik
                validationSchema={stepFourValidationSchema}
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form>
                        <FormControl>
                            <SimpleGrid spacingY={5}>
                                <SimpleGrid columns={2} spacingX={5}>
                                    <GridItem colSpan={2}>
                                        <Text>
                                            The nearest maternal and newborn health facility to my residence are:
                                        </Text>
                                    </GridItem>
                                    <GridItem
                                        colSpan={2}
                                    >
                                        <Text
                                            fontSize='xl'
                                        >
                                            Maternal/Hospital:
                                        </Text>
                                    </GridItem>
                                    <GridItem>
                                        <TextField
                                            label="Name of Hospital"
                                            name="maternalHostpital.name"
                                        />
                                    </GridItem>
                                    <GridItem>
                                        <TextField
                                            label="Address"
                                            name="maternalHostpital.address"
                                        />
                                    </GridItem>
                                </SimpleGrid>
                                <SimpleGrid
                                    columns={2}
                                    spacingX={5}
                                >
                                    <GridItem colSpan={2}>
                                        <Text fontSize='xl'>
                                            Newborn Hospital:
                                        </Text>
                                    </GridItem>
                                    <GridItem>
                                        <TextField
                                            label="Name of Hospital"
                                            name="newbornHostpital.name"
                                        />
                                    </GridItem>
                                    <GridItem>
                                        <TextField
                                            label="Address"
                                            name="newbornHostpital.address"
                                        />
                                    </GridItem>
                                </SimpleGrid>
                                <SimpleGrid columns={2} spacingX={5}>
                                    <GridItem>
                                    </GridItem>
                                    <GridItem>
                                        <Text fontSize="2xl">
                                            Conforme:
                                        </Text>
                                    </GridItem>
                                </SimpleGrid>
                                <SimpleGrid columns={4} spacingX={5}>
                                    <GridItem
                                        colSpan={2}
                                    >
                                    </GridItem>

                                    <GridItem>
                                        <TextField
                                            name="conforme.signature"
                                            label="Signature"
                                        />
                                    </GridItem>
                                    <GridItem>
                                        <DatePicker
                                            name="conforme.date"
                                            label="Date"
                                        />
                                    </GridItem>
                                </SimpleGrid>



                            </SimpleGrid>
                            <HStack mt={5}>
                                <Spacer />
                                <Button
                                    type="button"
                                    colorScheme='blue'
                                    onClick={() => {  props.prev(values)}}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    colorScheme='green'
                                >
                                    Submit</Button>
                            </HStack>
                        </FormControl >
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

