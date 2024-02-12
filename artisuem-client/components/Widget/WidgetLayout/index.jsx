"use client";
import { motion, AnimatePresence } from "framer-motion";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppContext from "../AppContext";
import { setUserId } from "../widgetSlice";
import { Header } from "./Header";
import { Keypad } from "./Keypad";
import { Launcher } from "./Launcher";
import { Messages } from "./Messages";
export const WidgetLayout = (props) => {
  const dispatch = useDispatch();
  let { toggleWidget, userId: _userId } = useSelector(
    (state) => state.widgetState
  );
  let { userId, embedded } = props;
  console.log(embedded);
  let userIdRef = useRef(_userId);
  useEffect(() => {
    if (userId) {
      userIdRef.current = userId;
    } else {
      if (!userIdRef.current) {
        userIdRef.current = nanoid();
        console.log(userIdRef.current);
        dispatch(setUserId(userIdRef.current));
      }
    }
  }, [dispatch, embedded, props.userId, toggleWidget, userId]);

  if (embedded) {
    return (
      
    <div className="fixed  !flex !h-[579px] !w-[400px] !right-0 !bottom-0 ">
      <AppContext.Provider value={{ userId: userIdRef.current, ...props }}>
        <AnimatePresence>
          <div
            className="  !flex !h-[579px] !w-[400px] !right-0 !bottom-0  flex-col rounded-[1.8rem]   bg-white  font-lato   shadow-md"
            key="widget"
          >
            <Header />
            <Messages />
            <Keypad />
          </div>
        </AnimatePresence>
      </AppContext.Provider>
      </div>
    );
  }
  return (
    <div className="fixed  !flex !h-[579px] !w-[400px] !right-0 !bottom-0 ">
    <AppContext.Provider value={{ userId: userIdRef.current, ...props }}>
      <AnimatePresence>
        {toggleWidget && (
          <motion.div
            className=" !bottom-0 !right-0 z-50 flex !h-[579px] !w-[400px]  flex-col rounded-[1.8rem]  bg-white font-lato  ring-1  ring-black/5    xs:right-0 xs:h-[calc(100%-100px)] xs:w-full"
            animate={{ y: -60 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            key="widget"
          >
            <Header />
            <Messages />
            <Keypad />
          </motion.div>
        )}
        <Launcher />
      </AnimatePresence>
    </AppContext.Provider>
    </div>
  );
};
