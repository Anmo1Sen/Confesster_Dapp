import Head from "next/head";
import { useQuery, gql } from "@apollo/client";
import {
  VStack,
  Heading,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";

const GET_COFFEES = gql`
  query coffees(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
    $where: Coffee_filter
  ) {
    coffees(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      message
      buyer
      author
      timestamp
    }
  }
`;

export default function Coffees() {
  const { account } = useAccount();
  const { loading, error, data } = useQuery(GET_COFFEES, {
    variables: {
      first: 10,
      skip: 0,
      orderBy: "timestamp",
      orderDirection: "desc",
    },
  });

  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Head>
        <title>Confesster Udemy Dapp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading
          size={"lg"}
          lineHeight="tall"
          textAlign={"center"}
          maxWidth="xl"
          mx="auto"
        >
          Recently Sent
          <Text
            bgGradient={"linear(to-r, purple.300,pink.300,blue.300,teal.300)"}
            bgClip="text"
          >
            {" "}
            Coffees
          </Text>
        </Heading>

        <VStack spacing={8} mt="10" align="center">
          {data?.coffees.map((coffee) => (
            <Box
              key={coffee.id}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              maxWidth={"xl"}
              width="full"
              bgGradient={"linear(to-r, yellow.300,teal.300,blue.300,blue.300)"}
              _hover={{
                bgGradient: "linear(to-r, pink.300,teal.300,blue.300,blue.300)",
                transform: "scale(1.02)",
                shadow: "lg",
                animationDuration: "0.5s",
                transition: "all 0.2s",
              }}
            >
              <Box bg={useColorModeValue("white", "gray.700")} px={6} py={4}>
                <Text as="span">
                  {coffee.buyer.slice(0, 6)}...{coffee.buyer.slice(-4)}{" "}
                </Text>
                sent a coffee to{" "}
                <Text as="span">
                  {coffee.author.slice(0, 6)}...{coffee.author.slice(-4)}
                </Text>
                <Text
                  mt={4}
                  bgGradient={
                    "linear(to-r, pink.300,teal.300,blue.300,gray.300)"
                  }
                  bgClip="text"
                  fontSize={"lg"}
                >
                  {coffee.message}
                </Text>
              </Box>
            </Box>
          ))}
        </VStack>
      </main>
    </div>
  );
}