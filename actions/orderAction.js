import {
  GET_POKES,
  DELETE_POKE,
  LOGGED_OUT,
  UPDATE_POKE,
  QUANTITY_CHANGE,
  QUANTITY_CHANGE_ERR,
  DELETE_IN_CART,
  CREATE_ORDER,
  COMPLETE_ORDER,
  SET_LOCATION,
  FILTER_ORDER
} from "./types";

export const pickedLocation = (
  location,
  opoint,
  destination_name,
  price,
  distance
) => {
  return (dispatch, getState) => {
    //console.log(location);
    //add plice in oda///////////////////////////////////////
    const price_oda = getState().dataz.order_items;
    //price_oda.push({ id: 1000, qty: 1, price: price, name: "Delivery Cost" });

    dispatch({
      type: SET_LOCATION,
      payload: [location, opoint, destination_name, distance, price_oda, price]
    });
  };
};

export const removeCartItem = itemid => {
  return (dispatch, getState) => {
    const now_od_items = getState().dataz.order_items;

    const toDelete = new Set([itemid]);
    const new_od_items = now_od_items.filter(obj => !toDelete.has(obj.itemid));
    //filterInPlace(arrayOfObjects, obj => !toDelete.has(obj.id));

    dispatch({
      type: DELETE_IN_CART,
      payload: new_od_items
    });

    //console.log("original data=", now_od_items);
    //console.log("updated data=", new_od_items);
  };
};

export const completeOrder = () => {
  return (dispatch, getState) => {
    var now_od_items = getState().dataz.order_items;

    if (now_od_items) {
      //here oder item data must be sent some where

      /////here empty tray
      dispatch({
        type: COMPLETE_ORDER,
        payload: []
      });
    }
  };
};

export const filterOrder =(data)=>{
  return (dispatch, getState) => {
    const now_od_items = getState().dataz.order_items;
    var forName = data.for;
    var Oid = data.id;
    var Oprice = data.price;

    console.log("data",data)

    //find the index of object from array that you want to update
    const objIndex = now_od_items.findIndex(obj => obj.id === Oid);

    // make new object of updated object.
    const updatedObj = { ...now_od_items[objIndex], for: forName,price:Oprice };

    // make final new array of objects by combining updated object.
    const new_od_items = [
      ...now_od_items.slice(0, objIndex),
      updatedObj,
      ...now_od_items.slice(objIndex + 1)
    ];

    dispatch({
      type: FILTER_ORDER,
      payload: new_od_items
    });

    //console.log("original data=", now_od_items);
    //console.log("updated data=", new_od_items);
    
  };
}

export const createOrder = odata => {
  return (dispatch, getState) => {
    var now_od_items = getState().dataz.order_items;

    if (now_od_items) {
      const objIndex = now_od_items.findIndex(
        obj => obj.itemid === odata.itemid
      );

      if (objIndex == -1) {
        now_od_items.push(odata);

        dispatch(
          {
            type: CREATE_ORDER,
            payload: now_od_items
          },
          () => {
            console.log("original data=", now_od_items);
          }
        );
      }
    } else {
      now_od_items.push(odata);

      dispatch(
        {
          type: CREATE_ORDER,
          payload: now_od_items
        },
        () => {
          console.log("original data=", now_od_items);
        }
      );
    }
    //console.log("original data=", now_od_items);
    //console.log("updated data=", new_od_items);
    //console.log(objIndex);
  };
};

export const changeQty = qdata => {
  return (dispatch, getState) => {
    const now_od_items = getState().dataz.order_items;
    var qty = qdata.qty;
    var oid = qdata.oid;

    //find the index of object from array that you want to update
    const objIndex = now_od_items.findIndex(obj => obj.id === oid);

    // make new object of updated object.
    const updatedObj = { ...now_od_items[objIndex], qty: qty };

    // make final new array of objects by combining updated object.
    const new_od_items = [
      ...now_od_items.slice(0, objIndex),
      updatedObj,
      ...now_od_items.slice(objIndex + 1)
    ];

    dispatch({
      type: QUANTITY_CHANGE,
      payload: new_od_items
    });

    //console.log("original data=", now_od_items);
    //console.log("updated data=", new_od_items);
  };
};

/**
 * 
 *  if (now_od_items) {
      const objIndex = now_od_items.findIndex(
        obj => obj.itemid === odata.itemid
      );

      if (objIndex == -1) {
        const new_od_items = now_od_items.push(odata);

        dispatch(
          {
            type: CREATE_ORDER,
            payload: new_od_items
          },
          () => {
            console.log("original data=", now_od_items);
            console.log("updated data=", new_od_items);
          }
        );
      }
    } else {
      const new_od_items = now_od_items.push(odata);

      dispatch(
        {
          type: CREATE_ORDER,
          payload: new_od_items
        },
        () => {
          console.log("original data=", now_od_items);
          console.log("updated data=", new_od_items);
        }
      );
    }
 */
