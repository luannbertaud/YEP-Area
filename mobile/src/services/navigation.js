function navigateTo(navigation, page) {
    navigation.navigate(page);
}

function navigateWithParameters(navigation, page, parameters) {
    navigation.navigate(page, parameters);
}

export {
    navigateTo,
    navigateWithParameters
}