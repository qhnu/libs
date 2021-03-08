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
      const app = Application(appPath)
      if (!app.running()) app.launch()

      const process = Application('System Events').processes[app.name()]

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

      console.log('name=', app.name())
    },
    appPath,
    filters
  )
}

export const resizeChrome = async () => {
  return await run((CHROME_PATH: string) => {
    const app = Application(CHROME_PATH)

    let window = null
    for (const i of Array(app.windows.length).keys()) {
      if (!/^Dev/.test(app.windows[i].name())) {
        window = app.windows[i]
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
    const app = Application(IRIS_PATH)
    if (app.running()) {
      app.quit()
      delay(1)
    }
    app.launch()

    const process = Application('System Events').processes[app.name()]
    process.menuBars
      .at(0)
      .menuBarItems.byName('File')
      .menus.byName('File')
      .menuItems.byName('New Recording...')
      .click()
  }, IRIS_PATH)
}

export const startRecord = async () => {
  return await run((IRIS_PATH: string) => {
    const app = Application(IRIS_PATH)
    const process = Application('System Events').processes[app.name()]
    process.windows.byName('Settings Window').buttons.byName('Record').click()
  }, IRIS_PATH)
}

export const stopRecord = async () => {
  return await run((IRIS_PATH) => {
    const app = Application(IRIS_PATH)
    const process = Application('System Events').processes[app.name()]
    process.menuBars
      .at(0)
      .menuBarItems.byName('File')
      .menus.byName('File')
      .menuItems.byName('Stop')
      .click()

    delay(1)

    app.quit()
  }, IRIS_PATH)
}

export const sleepOs = async () => {
  return await run(() => {
    const app = Application('System Preferences')
    app.sleep()
  })
}

export const switchAudioOutput = async (outputName: 'BlackHole' | '内蔵') => {
  return await run(
    (outputName) => {
      const app = Application('System Preferences')

      const pane = app.panes['com.apple.preference.sound']
      const anchor = pane.anchors['output']
      anchor.reveal()

      const process = Application('System Events').processes[
        'System Preferences'
      ]

      const rows = process.windows[0].tabGroups[0].scrollAreas[0].tables[0].rows

      rows().forEach((row: any) => {
        const name = row.textFields[0].value()
        if (name.includes(outputName)) {
          row.select()
        }
      })

      const selected = rows.where({ selected: true })[0].textFields[0].value()
      console.log(`[Jxa] selected=${selected}`)

      app.quit()
    },
    [outputName]
  )
}
