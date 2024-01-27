describe('template spec', () => {
    const URL_WEBSITE = 'https://animego.org/anime'
    const ITEM_SELECTOR_CARD = '.animes-list-item'
    const SIZE_WINDOW = {
        DESKTOP: {
            FULL_HD: {
                WIDTH: 1920,
                HEIGHT: 1080
            }
        },
        MOBILE: {
            IPHONE_SE: {
                WIDTH: 375,
                HEIGHT: 660
            }
        }
    }
    const setSettingsView = ({width, height}) => {
        cy.viewport(width, height)
    }

    const setPositionScroll = (x, y) => cy.scrollTo(x, y)
    const visitWebSite = () => cy.visit(URL_WEBSITE)
    const validHaveElement = (element) => cy.get(element).should('be.visible')
    const validElementOnAttr = (element, attr) => cy.get(element).should('have.attr', attr)
    const validElemsOnLength = (selector, length) => cy.get(selector).should('have.length', length)

    const tests = [
        {
            name: 'success loading website',
            viewport: {
                width: SIZE_WINDOW.DESKTOP.FULL_HD.WIDTH,
                height: SIZE_WINDOW.DESKTOP.FULL_HD.HEIGHT
            },
            setSettings: function () {
                setSettingsView({width: this.viewport.width, height: this.viewport.height})
            },
            startValid: function () {
                visitWebSite()
            },
            launch: true,
        },
        {
            name: 'loaded-start-content',
            viewport: {
                width: SIZE_WINDOW.DESKTOP.FULL_HD.WIDTH,
                height: SIZE_WINDOW.DESKTOP.FULL_HD.HEIGHT
            },
            setSettings: function () {
                setSettingsView({width: this.viewport.width, height: this.viewport.height})
            },
            startValid: function () {
                visitWebSite()
                validElemsOnLength(ITEM_SELECTOR_CARD, 20)
            },
            launch: true,
        },
        {
            name: 'valid elements',
            viewport: {
                width: SIZE_WINDOW.DESKTOP.FULL_HD.WIDTH,
                height: SIZE_WINDOW.DESKTOP.FULL_HD.HEIGHT
            },
            setSettings: function () {
                setSettingsView({width: this.viewport.width, height: this.viewport.height})
            },
            startValid: function () {
                visitWebSite()
                const elements = ['.navbar-nav', '#filter-block']
                elements.forEach(element => validHaveElement(element))
            },
            launch: true,
        },
        {
            name: 'valid load data on scroll',
            viewport: {
                width: SIZE_WINDOW.DESKTOP.FULL_HD.WIDTH,
                height: SIZE_WINDOW.DESKTOP.FULL_HD.HEIGHT
            },
            setSettings: function () {
                setSettingsView({width: this.viewport.width, height: this.viewport.height})
            },
            startValid: function () {
                visitWebSite()
                setPositionScroll(0, 5000)
                validElemsOnLength(ITEM_SELECTOR_CARD, 40)
            },
            launch: true,
        },
        {
            name: 'valid items card on attr "page',
            viewport: {
                width: SIZE_WINDOW.DESKTOP.FULL_HD.WIDTH,
                height: SIZE_WINDOW.DESKTOP.FULL_HD.HEIGHT
            },
            setSettings: function () {
                setSettingsView({width: this.viewport.width, height: this.viewport.height})
            },
            startValid: function () {
                visitWebSite()
                validHaveElement(ITEM_SELECTOR_CARD)
                validElementOnAttr('.col-12', 'data-page')
            },
            launch: true,
        },
        {
            name: 'valid locale storage success write data',
            viewport: {
                width: SIZE_WINDOW.DESKTOP.FULL_HD.WIDTH,
                height: SIZE_WINDOW.DESKTOP.FULL_HD.HEIGHT
            },
            setSettings: function () {
                setSettingsView({width: this.viewport.width, height: this.viewport.height})
            },
            startValid: function () {
                const localeKeyStorage = 'https://animego.org'
                visitWebSite()
                cy.getAllLocalStorage({log: true}).then(result => {
                    expect(result).to.deep.keys
                })
            },
            launch: true,
        }

    ]

    tests.forEach(test => test.launch ? (() => {
        it(test.name, () => {
            test.setSettings()
            test.startValid()
        })
    })() : false)

})