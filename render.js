$(".minimize-button").click(() => {
    api.window.minimize()
})

$(".maximize-button").click(() => {
    api.window.maximize()
})

$(".close-button").click(() => {
    api.window.close()
})