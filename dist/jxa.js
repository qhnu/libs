"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchBlackHoleOutput = exports.sleepOs = exports.stopRecord = exports.startRecord = exports.prepareIris = exports.resizeChrome = exports.showUiElementName = exports.fetchArgs = void 0;
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
        appWindow.bounds = { x: 0, y: 0, width: 1685, height: 1200 };
    }, CHROME_PATH);
};
exports.resizeChrome = resizeChrome;
const prepareIris = async () => {
    return await run_1.run((IRIS_PATH) => {
        const app = Application(IRIS_PATH);
        if (!app.running())
            app.launch();
        app.activate();
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
        if (!app.running())
            app.launch();
        app.activate();
        const process = Application('System Events').processes[app.name()];
        process.windows.byName('Settings Window').buttons.byName('Record').click();
    }, IRIS_PATH);
};
exports.startRecord = startRecord;
const stopRecord = async () => {
    return await run_1.run((IRIS_PATH) => {
        const app = Application(IRIS_PATH);
        app.activate();
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
        const process = Application('System Events').processes['System Preferences'];
        const rows = process.windows[0].tabGroups[0].scrollAreas[0].tables[0].rows;
        for (const row of rows()) {
            const name = row.textFields[0].value();
            if (useBlackHole === 'Y') {
                if (name.includes('BlackHole')) {
                    row.select();
                    break;
                }
            }
            else {
                if (!name.includes('BlackHole')) {
                    row.select();
                    break;
                }
            }
        }
        const selected = rows.where({ selected: true })[0].textFields[0].value();
        console.log(`[Jxa] selected=${selected}`);
        app.quit();
    }, [useBlackHole]);
};
exports.switchBlackHoleOutput = switchBlackHoleOutput;
