import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../services/Api';

import { UserContext } from '../../contexts/UserContext';

import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import UserIcon from '../../assets/icons/user.svg'
import MailIcon from '../../assets/icons/mail.svg';
import LockIcon from '../../assets/icons/lock.svg';
import PhoneIcon from '../../assets/icons/phone.svg';
import CellphoneIcon from '../../assets/icons/smartphone.svg';
import HashIcon from '../../assets/icons/hash.svg';


import SignInput from '../../components/SignInput';

import afyaLogo from '../../assets/img/logo.png';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [cpfField, setCpfField] = useState('');
    const [nameField, setNameField] = useState('');
    const [phoneField, setPhoneField] = useState('');
    const [cellphoneField, setCellphoneField] = useState('');
    const [mailField, setMailField] = useState('');
    const [bloodType, setBloodType] = useState('');

    const handleSignClick = async () => {
        if (cpfField != '' && nameField != '' && phoneField
            != '' && cellphoneField != '' && mailField
            != '' && bloodType != '') {

            let token = await AsyncStorage.getItem('token')
            console.log(token)

            try {
                const data = {
                    cpf: cpfField,
                    nome: nameField,
                    telefone: phoneField,
                    celular: cellphoneField,
                    email: mailField,
                    tipo_sanguineo: bloodType,
                };

                await Api.post("/patient", data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    console.log(res.data)
                    alert("O Paciente foi criado com sucesso")
                    navigation.reset({
                        routes: [{ name: 'MainTab' }]
                    });
                })

            } catch (error) {
                console.log(error)
                alert("Já existe cliente com o CPF cadastrado")
                navigation.reset({
                    routes: [{ name: 'RegistrarCliente' }]
                });
            }

        } else {
            alert("Por favor, preencha todos os campos")
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'Login' }]
        });
    }

    return (
        <Container>
            {/* 
            <Image
                source={afyaLogo}
                style={{ width: 200, height: 200 }}
                resizeMode='contain'
            /> */}
            <InputArea>
                <SignInput
                    IconSvg={HashIcon}
                    placeholder="Insira o CPF do cliente"
                    value={cpfField}
                    onChangeText={t => setCpfField(t)}
                />
                <SignInput
                    IconSvg={UserIcon}
                    placeholder="Insira nome do cliente"
                    value={nameField}
                    onChangeText={t => setNameField(t)}
                />
                <SignInput
                    IconSvg={PhoneIcon}
                    placeholder="Insira telefone do cliente"
                    value={phoneField}
                    onChangeText={t => setPhoneField(t)}
                />
                <SignInput
                    IconSvg={CellphoneIcon}
                    placeholder="Insira celular do cliente"
                    value={cellphoneField}
                    onChangeText={t => setCellphoneField(t)}
                />
                <SignInput
                    IconSvg={MailIcon}
                    placeholder="Insira e-mail do cliente"
                    value={mailField}
                    onChangeText={t => setMailField(t)}
                />
                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Insira tipo sanguíneo do cliente"
                    value={bloodType}
                    onChangeText={t => setBloodType(t)}
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Cadastrar cliente</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça o Login</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}