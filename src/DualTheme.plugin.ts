export default class DualThemePlugin {
    #bdApi = new BdApi("DualTheme");

    get #lightTheme(): string | undefined { return this.#bdApi.Data.load("lightTheme"); }
    set #lightTheme(value: string | undefined) { this.#bdApi.Data.save("lightTheme", value); }

    get #darkTheme(): string | undefined { return this.#bdApi.Data.load("darkTheme"); }
    set #darkTheme(value: string | undefined) { this.#bdApi.Data.save("darkTheme", value); }

    #preference = window.matchMedia("(prefers-color-scheme: light)");
    #listener = this.#onChange.bind(this)

    start() {
        this.#preference.addEventListener('change', this.#listener);
    }

    stop() {
        this.#preference.removeEventListener('change', this.#listener);
    }

    getSettingsPanel(): React.ReactElement {
        type DropdownSetting<T> = BetterDiscord.DropdownSetting<T>;

        const themes = BdApi.Themes.getAll().filter(x => x != undefined);

        const lightThemeSetting: DropdownSetting<string | undefined> = {
            id: "lightTheme",
            name: "Light Theme",
            type: "dropdown",
            options: themes.map(x => ({ label: x.name, value: x.id })),
            value: this.#lightTheme
        };

        const darkThemeSetting: DropdownSetting<string | undefined> = {
            id: "darkTheme",
            name: "Dark Theme",
            type: "dropdown",
            options: themes.map(x => ({ label: x.name, value: x.id })),
            value: this.#darkTheme
        };

        return BdApi.UI.buildSettingsPanel({
            settings: [lightThemeSetting, darkThemeSetting],
            onChange: (_, id, value) => {
                switch (id) {
                    case "lightTheme": this.#lightTheme = value; break;
                    case "darkTheme": this.#darkTheme = value; break;
                }
                this.#onChange();
            }
        });
    }

    #onChange() {
        for (const theme of BdApi.Themes.getAll()) {
            if (theme && BdApi.Themes.isEnabled(theme.id)) {
                BdApi.Themes.disable(theme.id);
            }
        }

        if (this.#preference.matches) {
            if (this.#lightTheme) {
                BdApi.Themes.enable(this.#lightTheme);
            }
        }
        else {
            if (this.#darkTheme) {
                BdApi.Themes.enable(this.#darkTheme);
            }
        }
    }
}