/* eslint-disable */
import * as Empty from '@jxa/global-type'
import { run } from '@jxa/run'

const CHROME_PATH = '/Applications/_Web/Google Chrome.app'
const IRIS_PATH = '/Applications/_Video/Iris.app'

export const fetchArgs = async (args: any) => {
  return await run((args: any) => {
    const payload = args
    return payload
  }, args)
}

export const showUiElementName = async (
  appPath: string,
  filters: string[] = []
) => {
  return await run(
    (appPath: string, filters: string[]) => {
      const outputUiPath = (applicationName: string) => {
        const process = Application('System Events').processes[applicationName]
        for (const content of process.entireContents()) {
          const displayString = Automation.getDisplayString(content)
          if (filters.length) {
            for (const row of displayString.split('\n')) {
              const has = filters.some((filter) => row.includes(filter))
              if (has) console.log('menu=', row)
            }
          } else {
            console.log('menu=', displayString)
          }
        }
      }

      const app = Application(appPath)
      if (!app.running()) app.launch()

      outputUiPath(app.name())
      console.log('name=', app.name())
    },
    appPath,
    filters
  )
}

export const resizeChrome = async () => {
  return await run((CHROME_PATH: string) => {
    const chrome = Application(CHROME_PATH)
    chrome.activate()

    let window = null
    for (const i of Array(chrome.windows.length).keys()) {
      if (!/^Dev/.test(chrome.windows[i].name())) {
        window = chrome.windows[i]
        break
      }
    }
    window.bounds = { x: 0, y: 0, width: 1800, height: 1200 } // objでのsetが必要

    let tab = null
    for (const i of Array(window.tabs.length).keys()) {
      if (/^http:\/\/localhost/.test(window.tabs[i].url())) {
        tab = window.tabs[i]
        window.activeTabIndex = i + 1 // インデックスは1から始まる
        break
      }
    }
  }, CHROME_PATH)
}

export const prepareIris = async () => {
  return await run((IRIS_PATH: string) => {
    const irisApp = Application(IRIS_PATH)
    if (irisApp.running()) {
      irisApp.quit()
      delay(1)
    }
    irisApp.launch()
    irisApp.activate()

    const irisEvents = Application('System Events').processes[irisApp.name()]
    irisEvents.menuBars
      .at(0)
      .menuBarItems.byName('File')
      .menus.byName('File')
      .menuItems.byName('New Recording...')
      .click()
  }, IRIS_PATH)
}

export const startRecord = async () => {
  return await run((IRIS_PATH: string) => {
    const irisApp = Application(IRIS_PATH)
    const irisEvents = Application('System Events').processes[irisApp.name()]
    irisEvents.windows
      .byName('Settings Window')
      .buttons.byName('Record')
      .click()
  }, IRIS_PATH)
}

export const stopRecord = async () => {
  return await run((IRIS_PATH) => {
    const irisApp = Application(IRIS_PATH)
    const irisEvents = Application('System Events').processes[irisApp.name()]
    irisEvents.menuBars
      .at(0)
      .menuBarItems.byName('File')
      .menus.byName('File')
      .menuItems.byName('Stop')
      .click()

    delay(1)

    irisApp.quit()
  }, IRIS_PATH)
}

export const sleepOs = async () => {
  return await run(() => {
    Application('System Events').sleep()
  })
}
