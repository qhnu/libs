"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveVoice = exports.setAudioMidi = exports.switchBlackHoleOutput = exports.sleepOs = exports.activateChrome = exports.resizeChrome = exports.showUiElementName = exports.fetchArgs = void 0;
const run_1 = require("@jxa/run");
const CHROME_PATH = '/Applications/_Web/Google Chrome.app';
const Audio_MIDI_PATH = '/System/Applications/Utilities/Audio MIDI Setup.app';
const VOICE_PATH = '/Applications/_Video/MYukkuriVoice-darwin-x64/MYukkuriVoice.app';
const fetchArgs = async (args) => {
    return await run_1.run((args) => {
        const payload = args;
        return payload;
    }, args);
};
exports.fetchArgs = fetchArgs;
const showUiElementName = async (appPath, filters = []) => {
    return await run_1.run((appPath, filters) => {
        const app = Application(appPath);
        if (!app.running())
            app.launch();
        app.activate();
        const process = Application('System Events').processes[app.name()];
        for (const content of process.entireContents()) {
            const displayString = Automation.getDisplayString(content);
            if (filters.length) {
                for (const row of displayString.split('\n')) {
                    const has = filters.some((filter) => row.includes(filter));
                    if (has)
                        console.log('menu=', row);
                }
            }
            else {
                console.log('menu=', displayString);
            }
        }
        console.log('name=', app.name());
    }, appPath, filters);
};
exports.showUiElementName = showUiElementName;
const resizeChrome = async () => {
    return await run_1.run((CHROME_PATH) => {
        const app = Application(CHROME_PATH);
        let appWindow = null;
        for (const window of app.windows()) {
            if (!/^Dev/.test(window.name())) {
                appWindow = window;
                break;
            }
        }
        appWindow.bounds = { x: 0, y: 0, width: 1700, height: 1200 };
    }, CHROME_PATH);
};
exports.resizeChrome = resizeChrome;
const activateChrome = async () => {
    return await run_1.run((CHROME_PATH) => {
        const app = Application(CHROME_PATH);
        app.activate();
    }, CHROME_PATH);
};
exports.activateChrome = activateChrome;
const sleepOs = async () => {
    return await run_1.run(() => {
        const app = Application('System Events');
        app.sleep();
    });
};
exports.sleepOs = sleepOs;
const switchBlackHoleOutput = async (useBlackHole) => {
    return await run_1.run((useBlackHole) => {
        const app = Application('System Preferences');
        const pane = app.panes['com.apple.preference.sound'];
        const anchor = pane.anchors['output'];
        anchor.reveal();
        const process = Application('System Events').processes[app.name()];
        const rows = process.windows[0].tabGroups[0].scrollAreas[0].tables[0].rows;
        const TARGET_NAME = 'BlackHole';
        for (const row of rows()) {
            const name = row.textFields[0].value();
            if (useBlackHole) {
                if (name.includes(TARGET_NAME)) {
                    row.select();
                    break;
                }
            }
            else {
                if (!name.includes(TARGET_NAME)) {
                    row.select();
                    break;
                }
            }
        }
        const selected = rows.where({ selected: true })[0].textFields[0].value();
        console.log(`[Jxa] selected=${selected}`);
    }, useBlackHole);
};
exports.switchBlackHoleOutput = switchBlackHoleOutput;
const setAudioMidi = async (output) => {
    return await run_1.run((Audio_MIDI_PATH, output) => {
        const app = Application(Audio_MIDI_PATH);
        if (!app.running())
            app.launch();
        app.activate();
        const process = Application('System Events').processes[app.name()];
        const menuItem = process.menuBars
            .at(0)
            .menuBarItems.byName('ウインドウ')
            .menus.byName('ウインドウ')
            .menuItems.at(0);
        if (menuItem.name() === 'オーディオ装置を表示') {
            menuItem.click();
        }
        const rows = process.windows
            .byName('オーディオ装置')
            .splitterGroups.at(0)
            .scrollAreas.at(0)
            .outlines.at(0).rows;
        const radioButtons = process.windows
            .byName('オーディオ装置')
            .splitterGroups.at(0)
            .tabGroups.at(0).radioButtons;
        const valueIndicator = process.windows
            .byName('オーディオ装置')
            .splitterGroups.at(0)
            .tabGroups.at(0)
            .scrollAreas.at(0)
            .outlines.at(0)
            .rows.at(1)
            .uiElements.byName('マスター')
            .sliders.at(0)
            .valueIndicators.at(0);
        const popUpButton = process.windows
            .byName('オーディオ装置')
            .splitterGroups.at(0)
            .tabGroups.at(0)
            .popUpButtons.at(1);
        const afterPopUpButton = () => {
            const menuItems = process.windows
                .byName('オーディオ装置')
                .splitterGroups.at(0)
                .tabGroups.at(0)
                .popUpButtons.at(1)
                .menus.at(0).menuItems;
            for (const menuItem of menuItems()) {
                if (menuItem.name() === '44,100 Hz') {
                    menuItem.click();
                    break;
                }
            }
        };
        for (const row of rows()) {
            for (const uiElement of row.uiElements()) {
                if (uiElement.name() === 'USB MICROPHONE') {
                    row.select();
                    radioButtons.byName('入力').click();
                    valueIndicator.value = output;
                }
                if (uiElement.name() === 'BlackHole 2ch') {
                    row.select();
                    radioButtons.byName('出力').click();
                    valueIndicator.value = output;
                }
            }
        }
    }, Audio_MIDI_PATH, output);
};
exports.setAudioMidi = setAudioMidi;
const saveVoice = async () => {
    return await run_1.run((VOICE_PATH) => {
        const app = Application(VOICE_PATH);
        if (!app.running())
            app.launch();
        app.activate();
        const process = Application('System Events').processes[app.name()];
        process.windows[0].bounds = { x: 1700, y: 0, width: 750, height: 600 };
        process.menuBars
            .at(0)
            .menuBarItems.byName('音声')
            .menus.byName('音声')
            .menuItems.byName('入力をクリア')
            .click();
        process.menuBars
            .at(0)
            .menuBarItems.byName('音声')
            .menus.byName('音声')
            .menuItems.byName('クリップボードからコピー (⌘D)')
            .click();
        process.menuBars
            .at(0)
            .menuBarItems.byName('音声')
            .menus.byName('音声')
            .menuItems.byName('音記号列に変換 (⌘→)')
            .click();
        process.menuBars
            .at(0)
            .menuBarItems.byName('音声')
            .menus.byName('音声')
            .menuItems.byName('音声の保存 (⌘S)')
            .click();
        const se = Application('System Events');
        se.keystroke(`voice-${Date.now()}`);
        se.keystroke('enter');
    }, VOICE_PATH);
};
exports.saveVoice = saveVoice;
