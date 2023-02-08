import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  Box,
  Flex,
  HStack,
  Stack,
  Link,
  IconButton,
  Button,
  useColorModeValue,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import {
  AddIcon,
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";

import { Web3Button } from "@web3modal/react";
import { useAccount, useConnect } from "wagmi";

import ConfessionModal from "./ConfessionModal";

const links = [
  { label: "My Confessions", to: "/myconfessions" },
  { label: "Coffees", to: "/coffees" },
];

const NavLink = ({ children, to }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    color={useColorModeValue("grey.600", "grey.400")}
    _hover={{
      textDecoration: "none",
      color: useColorModeValue("grey.600", "grey.400"),
    }}
    href={to}
  >
    {children}
  </Link>
);

const Layout = ({ children }) => {
  const [activeAcc, setActiveAcc] = useState(false);
  const account = useAccount();
  {
    /* CHAKRA */
  }
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const accounts = useAccount({
    onDisconnect() {
      window.location.reload();
    },
  });

  useEffect(() => {
    if (account.isConnected) {
      setActiveAcc(true);
    }
  }, [accounts]);

  return (
    <>
      <Box
        h="100vh"
        w="100vw"
        position="relative"
        zIndex="0"
        bg={useColorModeValue("white", "#171923")}
      >
        <Box px={4} maxWidth={"5xl"} m={"auto"} mt={"5"}>
          <Flex h={"16"} alignItems={"center"} justifyContent={"space-between"}>
            <HStack spacing={8} alignItems={"center"}>
              <Box>
                <Link href={"/"}>
                  <Image
                    src={"/confesster.svg"}
                    alt={"confesster"}
                    width={"120"}
                    height={"120"}
                  />
                </Link>
              </Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{
                  base: "none",
                  md: "flex",
                }}
              >
                {links.map(({ label, to }) => (
                  <NavLink key={label} to={to}>
                    {label}
                  </NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex
              alignItems={"center"}
              display={{
                base: "none",
                md: "flex",
              }}
            >
              <IconButton
                size={"md"}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                aria-label={"Toggle Color Mode"}
                onClick={toggleColorMode}
                mr={4}
              />
              {activeAcc && (
                <Button
                  variant={"solid"}
                  colorScheme={"pink"}
                  size={"sm"}
                  mr={4}
                  leftIcon={<AddIcon />}
                  onClick={onModalOpen}
                >
                  Confess
                </Button>
              )}
              <Web3Button />

              {/* FOR SMALL DEVICE */}
            </Flex>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
              mr={4}
            />
          </Flex>
          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {links.map(({ label, to }) => (
                  <NavLink key={label} to={to}>
                    {label}
                  </NavLink>
                ))}
                <IconButton
                  size={"md"}
                  icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  aria-label={"Toggle Color Mode"}
                  onClick={toggleColorMode}
                  mr={4}
                />
                ({" "}
                {activeAcc && (
                  <Button
                    variant={"solid"}
                    colorScheme={"pink"}
                    size={"sm"}
                    mr={4}
                    leftIcon={<AddIcon />}
                    onClick={onModalOpen}
                  >
                    Confess
                  </Button>
                )}
                <Web3Button />
              </Stack>
            </Box>
          ) : null}
        </Box>

        <ConfessionModal isOpen={isModalOpen} onClose={onModalClose} />
        <Box px={4} maxWidth={"5xl"} m={"auto"} mt={"5"}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
