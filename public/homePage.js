const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if(response.success === true) {
            location.reload();
        }
    });
}

ApiConnector.current((response) => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

const updateRatesBoard = () => {
    ApiConnector.getStocks((response) => {
        if (response.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

updateRatesBoard();

setInterval(() => {
    updateRatesBoard();
}, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    const addMoneyCallback = (response)=> {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
        } else {
            moneyManager.setMessage(response.error, "Недостаточно средств");
        }
    }
    ApiConnector.addMoney(data, addMoneyCallback);
}

moneyManager.conversionMoneyCallback = (data) => {
    const conversionMoneyCallback = (response) => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
        } else {
            moneyManager.setMessage(response.error, "Недостаточно средств");
        }
    }
    ApiConnector.convertMoney(data, conversionMoneyCallback);
}

moneyManager.sendMoneyCallback = (data) => {
    const sendMoneyCallback = (response) => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
        } else {
            moneyManager.setMessage(response.error, "Недостаточно средств");
        }
    }
    ApiConnector.transferMoney(data, sendMoneyCallback);
}

const favoritesVigets = new FavoritesWidget();

const updateFavoritesWidget = () => {
    ApiConnector.getFavorites((response) => {
        if (response.success === true) {
            favoritesVigets.clearTable();
            favoritesVigets.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    });
}

updateFavoritesWidget();

favoritesVigets.addUserCallback = (data) => {
    const addUserCallback = (response) => {
        if (response.success === true) {
            favoritesVigets.clearTable();
            favoritesVigets.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesVigets.setMessage(response.error, "Не удалось удалить пользователя")
        }
    }

    ApiConnector.addUserToFavorites(data, addUserCallback);
}

favoritesVigets.removeUserCallback = (data) => {
    const removeUserCallback = (response) => {
        if (response.success === true) {
            favoritesVigets.clearTable();
            favoritesVigets.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesVigets.setMessage(response.error, "Не удалось удалить пользователя")
        }
    }

    ApiConnector.removeUserFromFavorites(data, removeUserCallback);
}
