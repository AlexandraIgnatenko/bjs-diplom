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
            moneyManager.setMessage(response.success, "Баланс пополнен");
        } else {
            moneyManager.setMessage(response.success, "Ошибка");
        }
    }
    ApiConnector.addMoney(data, addMoneyCallback);
}

moneyManager.conversionMoneyCallback = (data) => {
    const conversionMoneyCallback = (response) => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Конвертация средств выполнена");
        } else {
            moneyManager.setMessage(response.success, "Ошибка");
        }
    }
    ApiConnector.convertMoney(data, conversionMoneyCallback);
}

moneyManager.sendMoneyCallback = (data) => {
    const sendMoneyCallback = (response) => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Перевод доставлен");
        } else {
            moneyManager.setMessage(response.success, "Ошибка");
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
            favoritesVigets.setMessage(response.success, "Пользователь добавлен");
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesVigets.setMessage(response.success, "Ошибка");
        }
    }

    ApiConnector.addUserToFavorites(data, addUserCallback);
}

favoritesVigets.removeUserCallback = (data) => {
    const removeUserCallback = (response) => {
        if (response.success === true) {
            favoritesVigets.clearTable();
            favoritesVigets.fillTable(response.data);
            favoritesVigets.setMessage(response.success, "Пользователь удален");
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesVigets.setMessage(response.success, "Ошибка")
        }
    }

    ApiConnector.removeUserFromFavorites(data, removeUserCallback);
}
