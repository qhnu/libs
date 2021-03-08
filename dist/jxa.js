"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchAudioOutput = exports.sleepOs = exports.stopRecord = exports.startRecord = exports.prepareIris = exports.resizeChrome = exports.showUiElementName = exports.fetchArgs = void 0;
const run_1 = require("@jxa/run");
const CHROME_PATH = '/Applications/_Web/Google Chrome.app';
const IRIS_PATH = '/Applications/_Video/Iris.app';
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
        let window = null;
        for (const i of Array(app.windows.length).keys()) {
            if (!/^Dev/.test(app.windows[i].name())) {
                window = app.windows[i];
                break;
            }
        }
        window.bounds = { x: 0, y: 0, width: 1800, height: 1200 };
        let tab = null;
        for (const i of Array(window.tabs.length).keys()) {
            if (/^http:\/\/localhost/.test(window.tabs[i].url())) {
                tab = window.tabs[i];
                window.activeTabIndex = i + 1;
                break;
            }
        }
    }, CHROME_PATH);
};
exports.resizeChrome = resizeChrome;
const prepareIris = async () => {
    return await run_1.run((IRIS_PATH) => {
        const app = Application(IRIS_PATH);
        if (app.running()) {
            app.quit();
            delay(1);
        }
        app.launch();
        const process = Application('System Events').processes[app.name()];
        process.menuBars
            .at(0)
            .menuBarItems.byName('File')
            .menus.byName('File')
            .menuItems.byName('New Recording...')
            .click();
    }, IRIS_PATH);
};
exports.prepareIris = prepareIris;
const startRecord = async () => {
    return await run_1.run((IRIS_PATH) => {
        const app = Application(IRIS_PATH);
        const process = Application('System Events').processes[app.name()];
        process.windows.byName('Settings Window').buttons.byName('Record').click();
    }, IRIS_PATH);
};
exports.startRecord = startRecord;
const stopRecord = async () => {
    return await run_1.run((IRIS_PATH) => {
        const app = Application(IRIS_PATH);
        const process = Application('System Events').processes[app.name()];
        process.menuBars
            .at(0)
            .menuBarItems.byName('File')
            .menus.byName('File')
            .menuItems.byName('Stop')
            .click();
        delay(1);
        app.quit();
    }, IRIS_PATH);
};
exports.stopRecord = stopRecord;
const sleepOs = async () => {
    return await run_1.run(() => {
        const app = Application('System Preferences');
        app.sleep();
    });
};
exports.sleepOs = sleepOs;
const switchAudioOutput = async (outputName) => {
    return await run_1.run((outputName) => {
        const app = Application('System Preferences');
        const pane = app.panes['com.apple.preference.sound'];
        const anchor = pane.anchors['output'];
        anchor.reveal();
        const process = Application('System Events').processes['System Preferences'];
        const rows = process.windows[0].tabGroups[0].scrollAreas[0].tables[0].rows;
        rows().forEach((row) => {
            const name = row.textFields[0].value();
            if (name.includes(outputName)) {
                row.select();
            }
        });
        const selected = rows.where({ selected: true })[0].textFields[0].value();
        console.log(`[Jxa] selected=${selected}`);
        app.quit();
    }, [outputName]);
};
exports.switchAudioOutput = switchAudioOutput;
