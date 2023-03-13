import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, Text, VStack, ScrollView } from "native-base";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormLoginInProps = {
  email: string;
  password: string;
}

const signUpSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha tem pelo menos 6 dígitos.'),
});

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormLoginInProps>({
    resolver: yupResolver(signUpSchema)
  });

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  function handleLoginIn({ email, password }: FormLoginInProps) {
    console.log({ email, password });
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">Treine sua mente e o seu corpo</Text>
        </Center>

        <Center>
          <Heading
            color="gray.100"
            fontSize="xl"
            mb={6}
            fontFamily="heading"
          >
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value }}) => (
              <Input 
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value }}) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Acessar"
            onPress={handleSubmit(handleLoginIn)}
          />
        </Center>

        <Center mt={24}>
          <Text
            color="gray.100"
            fontSize="sm"
            mb={3}
            fontFamily="body"
          >
            Ainda não tem acesso?
          </Text>

          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}