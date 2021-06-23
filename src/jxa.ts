/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import _ from '@jxa/global-type'
import { run } from '@jxa/run'

const Audio_MIDI_PATH = '/System/Applications/Utilities/Audio MIDI Setup.app'
const VOICE_PATH = '/Applications/_Video/MYukkuriVoice-darwin-x64/MYukkuriVoice.app'
const FAN_CONTROL_PATH = '/Applications/_Video/Macs Fan Control.app'

export const fetchArgs = async (args: any) => {
  return await run((args: any) => {
    const payload = args
    return payload
  }, args)
}

// const process = Application('System Events').processes[app.name()]
// for (const content of process.entireContents()) {
//   const displayString = Automation.getDisplayString(content)
//   console.log('menu=', displayString)
// }

export const showUiElementName = async (appPath: string, filters: string[] = []) => {
  return await run(
    (appPath: string, filters: string[]) => {
      const app = Application(appPath)
      if (!app.running()) {
        app.launch()
        delay(1)
      }
      app.activate()

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

export const activateApp = async (appPath: string) => {
  return await run((appPath: string) => {
    const app = Application(appPath)
    app.activate()
  }, appPath)
}

export const resizeApp = async (appPath: string) => {
  return await run((appPath: string) => {
    const app = Application(appPath)
    const process = Application('System Events').processes[app.name()]

    const window = process.windows[0]
    window.position = [0, 0]
    window.size = [1700, 1200]
    // console.log('show properties', JSON.stringify(window.properties()))
  }, appPath)
}

export const sleepOs = async () => {
  return await run(() => {
    const app = Application('System Events')
    app.sleep()
  })
}

export const switchBlackHoleOutput = async (useBlackHole: boolean) => {
  return await run((useBlackHole) => {
    const app = Application('System Preferences')

    const pane = app.panes['com.apple.preference.sound']
    const anchor = pane.anchors['output']
    anchor.reveal()

    const process = Application('System Events').processes[app.name()]

    const rows = process.windows[0].tabGroups[0].scrollAreas[0].tables[0].rows

    for (const row of rows()) {
      const name = row.textFields[0].value()
      if (useBlackHole) {
        if (name.includes('BlackHole')) {
          row.select()
          break
        }
      } else {
        if (name.includes('内蔵スピーカー')) {
          row.select()
          break
        }
        if (name.includes('ヘッドフォン')) {
          row.select()
          break
        }
      }
    }

    const selected = rows.where({ selected: true })[0].textFields[0].value()
    console.log(`[Jxa] selected=${selected}`)
  }, useBlackHole)
}

export const setAudioMidi = async (output: number) => {
  return await run(
    (Audio_MIDI_PATH: string, output: number) => {
      const app = Application(Audio_MIDI_PATH)
      if (!app.running()) {
        app.launch()
        delay(1)
      }
      app.activate()

      const process = Application('System Events').processes[app.name()]

      const menuItem = process.menuBars
        .at(0)
        .menuBarItems.byName('ウインドウ')
        .menus.byName('ウインドウ')
        .menuItems.at(0)

      if (menuItem.name() === 'オーディオ装置を表示') {
        menuItem.click()
      }

      const rows = process.windows
        .byName('オーディオ装置')
        .splitterGroups.at(0)
        .scrollAreas.at(0)
        .outlines.at(0).rows

      const radioButtons = process.windows
        .byName('オーディオ装置')
        .splitterGroups.at(0)
        .tabGroups.at(0).radioButtons

      const valueIndicator = process.windows
        .byName('オーディオ装置')
        .splitterGroups.at(0)
        .tabGroups.at(0)
        .scrollAreas.at(0)
        .outlines.at(0)
        .rows.at(1)
        .uiElements.byName('マスター')
        .sliders.at(0)
        .valueIndicators.at(0)

      const popUpButton = process.windows
        .byName('オーディオ装置')
        .splitterGroups.at(0)
        .tabGroups.at(0)
        .popUpButtons.at(1)

      const afterPopUpButton = () => {
        const menuItems = process.windows
          .byName('オーディオ装置')
          .splitterGroups.at(0)
          .tabGroups.at(0)
          .popUpButtons.at(1)
          .menus.at(0).menuItems

        for (const menuItem of menuItems()) {
          if (menuItem.name() === '44,100 Hz') {
            menuItem.click()
            break
          }
        }
      }

      for (const row of rows()) {
        for (const uiElement of row.uiElements()) {
          if (uiElement.name() === 'USB audio CODEC 2') {
            row.select()

            // popUpButton.click()
            // afterPopUpButton()

            radioButtons.byName('入力').click()
            valueIndicator.value = output
          }

          if (uiElement.name() === 'BlackHole 2ch') {
            row.select()

            // popUpButton.click()
            // afterPopUpButton()

            radioButtons.byName('出力').click()
            valueIndicator.value = output
          }
        }
      }
    },
    Audio_MIDI_PATH,
    output
  )
}

export const saveVoice = async (type: 'F' | 'M', slide: boolean) => {
  return await run(
    (VOICE_PATH: string, type: 'F' | 'M', slide: boolean) => {
      const app = Application(VOICE_PATH)
      if (!app.running()) {
        app.launch()
        delay(1)
      }
      app.activate()

      const process = Application('System Events').processes[app.name()]

      const window = process.windows[0]
      window.position = [1750, 0]
      window.size = [750, 600]
      // console.log('show properties', JSON.stringify(window.properties()))

      const systemEvents = Application('System Events')

      if (slide) {
        // UIエレメントとして認識されていない要素は、ショートカットキーも不可
        // つまり、systemEvents.keystroke('0', { using: 'command down' }) は不可

        process.menuBars
          .at(0)
          .menuBarItems.byName('ボイス設定')
          .menus.byName('ボイス設定')
          .menuItems.byName('次の設定に切り替え (⌘←)')
          .click()
      }

      process.menuBars
        .at(0)
        .menuBarItems.byName('音声')
        .menus.byName('音声')
        .menuItems.byName('入力をクリア')
        .click()

      process.menuBars
        .at(0)
        .menuBarItems.byName('音声')
        .menus.byName('音声')
        .menuItems.byName('クリップボードからコピー (⌘D)')
        .click()

      process.menuBars
        .at(0)
        .menuBarItems.byName('音声')
        .menus.byName('音声')
        .menuItems.byName('音記号列に変換 (⌘→)')
        .click()

      process.menuBars
        .at(0)
        .menuBarItems.byName('音声')
        .menus.byName('音声')
        .menuItems.byName('音声の保存 (⌘S)')
        .click()

      systemEvents.keyCode(102) // 「英数」キー

      delay(0.5)

      const fileName = String(Date.now())
      systemEvents.keystroke(fileName) // 名称未設定.wavのの「名称未設定」が選択済みの状態で名称変更

      // https://qiita.com/zakuroishikuro/items/afab0e33ad2030ba2f92#keycode
      systemEvents.keyCode(52) // 「return」キー
    },
    VOICE_PATH,
    type,
    slide
  )
}

export const launchFanControl = async () => {
  return await run((FAN_CONTROL_PATH: string) => {
    const app = Application(FAN_CONTROL_PATH)
    if (app.running()) return

    app.launch()
    delay(0.25)
    app.activate()

    const process = Application('System Events').processes[app.name()]

    process.windows
      .byName('Macs Fan Control 1.5.9 Free (MacBookPro10,1)')
      .groups.at(0)
      .buttons.byName('メニューバーに隠す')
      .click()
  }, FAN_CONTROL_PATH)
}

export const quitFanControl = async () => {
  return await run((FAN_CONTROL_PATH: string) => {
    const app = Application(FAN_CONTROL_PATH)
    if (app.running()) app.quit()
  }, FAN_CONTROL_PATH)
}
