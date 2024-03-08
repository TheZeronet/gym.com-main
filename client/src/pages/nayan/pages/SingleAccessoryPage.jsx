import {
  Box,
  Button,
  HStack,
  IconButton,
  Img,
  Tag,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getUserData } from "../../../redux/auth/auth.actions";
import {
  ACTION_ADD_ITEM_TO_CART,
  ACTION_ADD_ITEM_TO_WISHLIST,
  ACTION_GET_CART,
} from "../../../redux/cart/cart.actions";
import { ACTION_GET_PRODUCTS } from "../../../redux/products/product.actions";
import Loading from "../../Loading";

import { AiOutlineHeart } from "react-icons/ai";

const SingleAccessoryPage = () => {
  const [quant, setQuant] = useState(1);
  const toast = useToast();

  const dispatch = useDispatch();
  const { userData, isAuth } = useSelector((store) => store.auth);

  const [LoadingT, setLoading] = useState(true);
  const [SingleData, setSingle] = useState({});
  const [accessories, setAccessories] = useState([]);

  const { producerID } = useParams();
  const NavigatKaro = useNavigate();

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/accessories",
          {}
        );
        setAccessories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      }
    };
    fetchAccessories();
  }, [producerID]);

  useEffect(() => {
    const selectedAccessory = accessories.find(
      (accessories) => accessories.producerID === producerID
    );
    console.log(selectedAccessory);
    if (selectedAccessory) {
      setSingle(selectedAccessory);
      console.log(SingleData);
    }
  }, [producerID, accessories]);

  const handleCart = () => {
    if (!isAuth) {
      toast({
        title: "You Need Login first",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return NavigatKaro("/login");
    }

    let check = true;

    userData.cart.map((el) => {
      if (el.name === SingleData.name) {
        check = false;

        return toast({
          title: "Product Already in Cart",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      }
    });

    if (check) {
      let token = JSON.parse(localStorage.getItem("token"));

      let Product = {
        email: token.email,
        data: { ...SingleData, qty: quant },
      };

      dispatch(ACTION_ADD_ITEM_TO_CART(Product)).then((res) =>
        dispatch(getUserData(token.email))
      );
      toast({
        title: "Product Added to cart",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const AddWishlist = () => {
    if (!isAuth) {
      toast({
        title: "You Need Login first",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return NavigatKaro("/login");
    }

    let check = true;

    userData.wishlist.map((el) => {
      if (el.name === SingleData.name) {
        check = false;

        return toast({
          title: "Product Already in Wishlist",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      }
    });

    if (check) {
      let token = JSON.parse(localStorage.getItem("token"));

      let Product = {
        email: token.email,
        data: { ...SingleData, qty: quant },
      };

      dispatch(ACTION_ADD_ITEM_TO_WISHLIST(Product)).then((res) =>
        dispatch(getUserData(token.email))
      );
      toast({
        title: "Product Added to Wishlist",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  if (LoadingT) {
    return <Loading />;
  }

  return (
    <Box
      bgGradient="linear-gradient(180deg, rgba(0,0,0,1) 20%, rgba(64,64,64,1) 93%)"
      minH="100vh"
    >
      <Box
        display={{ base: "grid", md: "grid", sm: "grid", lg: "flex" }}
        w={{ base: "100%", md: "100%", sm: "100%", lg: "90%" }}
        m="auto"
        maxW="1400px"
        alignContent="center"
        color={"white"}
      >
        <VStack
          mt="50px"
          h="100%"
          p={5}
          align={"center"}
          justify="center"
          w={"100%"}
        >
          <Img
            bg={"whiteAlpha.200"}
            borderRadius={10}
            maxW={{ md: "400px", lg: "400px", xl: "500px" }}
            src={SingleData.imgURL}
            alt="SingleAccessory"
          />
        </VStack>
        <VStack
          p={5}
          bg={"whiteAlpha.200"}
          mt="50px"
          spacing={3}
          align={"flex-start"}
        >
          <VStack align={"flex-start"}>
            <Text fontSize="2xl" fontWeight="500" color="gray.200">
              Name : {SingleData.name}
            </Text>
            <Text fontSize="1xl" fontWeight="500" color="gray.400">
              Price : ₹{SingleData.price}
            </Text>
          </VStack>
          <VStack
            spacing={5}
            w="80%"
            textAlign={{
              base: "left",
              md: "left",
              sm: "left",
              lg: "left",
            }}
          >
            <Text fontSize="md" fontWeight={"medium"}>
              {SingleData.description}
            </Text>
          </VStack>

          <HStack
            m={{ base: "0px", sm: "0px", lg: "20px", md: "10px" }}
            mt="20px"
            w={{ base: "100%", sm: "60%", md: "70%", lg: "50%" }}
          >
            <HStack
              maxW={"120px"}
              alignItems="center"
              display="flex"
              justifyContent="space-between"
            >
              <Button
                bg="#f36100"
                disabled={quant < 1}
                onClick={() => setQuant((prev) => prev - 1)}
              >
                -
              </Button>
              <Text>{quant}</Text>
              <Button bg="#f36100" onClick={() => setQuant((prev) => prev + 1)}>
                +
              </Button>
            </HStack>
          </HStack>

          <HStack>
            <Button bg="#f36100" onClick={handleCart}>
              Add to Cart
            </Button>
            <IconButton
              p="0px 20px"
              fontSize="3xl"
              onClick={AddWishlist}
              color="white"
              fontWeight="bold"
              rounded="lg"
              textTransform="uppercase"
              _hover={{
                bg: "white",
                color: "#f45f02;",
              }}
              bg="#f45f02;"
              icon={<AiOutlineHeart />}
            />
          </HStack>

          <br />

          <VStack align={"flex-start"} color={"gray.200"}>
            <Text borderBottom={"1px solid gray"}>
              brand: {SingleData.maker}
            </Text>
            <Text borderBottom={"1px solid gray"}>
              
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default SingleAccessoryPage;
