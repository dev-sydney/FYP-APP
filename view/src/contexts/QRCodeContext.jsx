import { createContext, useReducer } from 'react';
import qrCodeReducer from '../reducers/qrCodeReducer';

const qrCodeContext = createContext();

export const QrCodeContextProvider = ({ children }) => {
  const initialState = {
    qrCodeDetails: null,
  };
  const [state, dispatch] = useReducer(qrCodeReducer, initialState);

  const getQrCodeDetails = async (QRcodeData) => {};

  return (
    <qrCodeContext.Provider
      value={{
        qrCodeDetails: state.qrCodeDetails,
        getQrCodeDetails,
      }}
    >
      {children}
    </qrCodeContext.Provider>
  );
};

export default qrCodeContext;
