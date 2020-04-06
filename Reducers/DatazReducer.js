import {
  GET_POKES,
  DELETE_POKE,
  UPDATE_POKE,
  QUANTITY_CHANGE,
  QUANTITY_CHANGE_ERR,
  CREATE_ORDER,
  COMPLETE_ORDER,
  DELETE_IN_CART,
  SET_LOCATION,
  FILTER_ORDER,
} from "../actions/types";

const initialState = {
  //////////////home pageeeeeee//////////////////////////////////////////////////

  categories: [
    {
      id: 1,
      image: require("../assets/images/Food.png"),
      name: "Food",
      sub_cats: [
        {
          name: "bites",
          image:
            "https://images.unsplash.com/photo-1581331474665-a0bbee7dfba9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        },
        {
          name: "hot foods",
          image:
            "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        },
        {
          name: "cold foods",
          image:
            "https://images.unsplash.com/photo-1582550740000-e8232e9e9562?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        }
      ]
    },
    {
      id: 5,
      image: require("../assets/images/Food.png"),
      name: "Beverages",
      sub_cats: [
        {
          name: "smoothy",
          image:
            "https://images.unsplash.com/photo-1570813092574-b4cccfc58f9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        },
        {
          name: "detoxy",
          image:
            "https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        },
        {
          name: "normal",
          image:
            "https://images.unsplash.com/photo-1517620034968-c04439d3618f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        }
      ]
    },
    {
      id: 2,
      image:require("../assets/images/Makeup.png"),
      name: "Parcel",
      sub_cats: [
        {
          name: "liqual",
          image:
            "https://images.unsplash.com/photo-1570813092574-b4cccfc58f9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        },
        {
          name: "bar",
          image:
            "https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        },
        {
          name: "solid",
          image:
            "https://images.unsplash.com/photo-1517620034968-c04439d3618f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        }
      ]
    },
    {
      id: 3,
      image: require("../assets/images/Health.png"),
      name: "Medicine",
      sub_cats: [
        {
          name: "equipments",
          image:
            "https://images.unsplash.com/photo-1570813092574-b4cccfc58f9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        },
        {
          name: "tabs",
          image:
            "https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        },
        {
          name: "injections",
          image:
            "https://images.unsplash.com/photo-1517620034968-c04439d3618f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        },
        {
          name: "surplus",
          image:
            "https://images.unsplash.com/photo-1517620034968-c04439d3618f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        }
      ]
    }
  ],

  items: [
    {
      id: 1,
      store: "mariam biriani",
      name: "Biriani",
      price: "4000",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      cat_name: "Food",
      sub_cat: "hot foods"
    },
    {
      id: 9,
      store: "markjuice",
      name: "Mango fresh",
      price: "2000",
      image:
        "https://images.unsplash.com/photo-1549128247-37e905ebdb3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      cat_name: "Beverages",
      sub_cat: "smoothy"
    },
    {
      id: 2,
      store: "Aziza cosmetics",
      name: "wanja",
      price: "500",
      image:
        "https://images.unsplash.com/photo-1518274975795-c0947d525db2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      cat_name: "Parcel",
      sub_cat: "bar"
    },
    {
      id: 3,
      store: "Fabeck Phamancy",
      name: "Paracetamol",
      price: "300",
      image:
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      cat_name: "Medicine",
      sub_cat: "injections"
    },

    {
      id: 4,
      store: "Twivunge",
      name: "Kande bite",
      price: "4500",
      image:
        "https://images.unsplash.com/photo-1569058242252-623df46b5025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      cat_name: "Food",
      sub_cat: "cold foods"
    },
    {
      id: 5,

      store: "Zanana",
      name: "Pasion fresh",
      price: "2200",
      image:
        "https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      cat_name: "Beverages",
      sub_cat: "detoxy"
    },
    {
      id: 6,
      store: "Andy beauty",
      name: "body losion",
      price: "15000",
      image:
        "https://images.unsplash.com/photo-1512303309580-3c7578b8fc3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      cat_name: "Parcel",
      sub_cat: "liqual"
    },
    {
      id: 7,
      store: "Nakiete Phamancy",
      name: "neurobium",
      price: "6500",
      image:
        "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      cat_name: "Medicine",
      sub_cat: "tabs"
    },
    {
      id: 10,
      store: "markjuice",
      name: "mix nyagi",
      price: "2500",
      image:
        "https://images.unsplash.com/photo-1514994960127-ed3ef9239d11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      cat_name: "Beverages",
      sub_cat: "normal"
    }
  ],

  adds: [
    {
      id: 2,
      name: "",
      image:"https://images.unsplash.com/photo-1545754605-208c9e7c7053?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "",
      image:
        "https://images.unsplash.com/photo-1527020431145-77f7c047e7a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      name: "",
      image:
        "https://images.unsplash.com/photo-1571933724782-3ddf0e4f752f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    }
  ],
  order_items_price: [], 
  order_items: [],
  dpoint: { longitude: "", latitude: "" },
  opoint: { longitude: "", latitude: "" },
  destination_name: "",
  distance: 0,
  price: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POKES:
      return {
        ...state,
        pokes: action.payload
      };
    case DELETE_POKE:
      return {
        ...state,
        pokes: state.pokes.filter(poke => poke.id !== action.payload)
      };
    case FILTER_ORDER:
      return {
        ...state,
        order_items:action.payload
      };
    case UPDATE_POKE:
      return {
        ...state,
        pokes: action.payload
      };
    case QUANTITY_CHANGE:
      return {
        ...state,
        order_items: action.payload
      };
    case CREATE_ORDER:
      return {
        ...state,
        order_items: action.payload
      };
    case COMPLETE_ORDER:
      return {
        ...state,
        order_items: action.payload
      };
    case DELETE_IN_CART:
      return {
        ...state,
        order_items: action.payload
      };
    case SET_LOCATION:
      return {
        ...state,
        dpoint: action.payload[0],
        opoint: action.payload[1],
        destination_name: action.payload[2],
        distance: action.payload[3],
        order_items_price: action.payload[4],
        price: action.payload[5]
      };
    default:
      return state;
  }
}
