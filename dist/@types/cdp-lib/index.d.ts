﻿/*!
 * cdp-lib.d.ts
 * This file is generated by the CDP package build process.
 *
 * Date: 2017-06-16T03:49:38.016Z
 */
// Dependencies for this module:
//   ../fs-extra
//   ../glob
//   ../hogan.js
//   ../lodash
//   ../underscore.string
//   ../which
//   ../uuid
//   ../chalk
//   ../semver-regex
//   ../cli-spinner
//   ../child_process

declare module "cdp-lib" {
    import * as Utils from "cdp-lib/utils";
    export { Utils };
    import { ISourceDirctoryConfigration, IBaseStructureConfigration, IProjectConfigration, IBuildTargetConfigration, ILibraryConfigration, IExternalModuleInfo, IExternalModules, IMobileAppConfigration, IDesktopAppConfigration, IWebAppConfigration } from "cdp-lib/generators";
    export { ISourceDirctoryConfigration, IBaseStructureConfigration, IProjectConfigration, IBuildTargetConfigration, ILibraryConfigration, IExternalModuleInfo, IExternalModules, IMobileAppConfigration, IDesktopAppConfigration, IWebAppConfigration };
    /**
     * @class CDPLib
     * @brief CDP boilerplate 生成機能を提供するクラス
     */
    export default class CDPLib {
        /**
         * main command
         */
        static execute(config: IProjectConfigration): Promise<void>;
    }
}

declare module "cdp-lib/utils" {
    export * from "cdp-lib/utils/libs";
    export * from "cdp-lib/utils/tools";
    export * from "cdp-lib/utils/settings";
}

declare module "cdp-lib/generators" {
    import { GeneratorBase, IProjectConfigration } from "cdp-lib/generators/base";
    export * from "cdp-lib/generators/base";
    export * from "cdp-lib/generators/library";
    export * from "cdp-lib/generators/mobile";
    export * from "cdp-lib/generators/desktop";
    export * from "cdp-lib/generators/web";
    /**
      * generator 生成関数
      */
    export function newGenerator(config: IProjectConfigration): GeneratorBase;
}

declare module "cdp-lib/utils/libs" {
    import * as fs from "fs-extra";
    import * as glob from "glob";
    import * as hogan from "hogan.js";
    import * as _l from "lodash";
    import * as _s from "underscore.string";
    import * as which from "which";
    import * as uuid from "uuid";
    import * as chalk from "chalk";
    import * as semverRegex from "semver-regex";
    import { Spinner } from "cli-spinner";
    const $: JQueryStatic;
    export type MixinedUnderscoreStatic = typeof _s & typeof _l;
    const _m: MixinedUnderscoreStatic;
    export { fs, glob, hogan, $, _m as _, which, uuid, chalk, semverRegex, Spinner };
}

declare module "cdp-lib/utils/tools" {
    import { SpawnOptions } from "child_process";
    /**
     * Handle command line error and kill process.
     * When the application received error from cli, please call this method.
     *
     * @param {String} error  error information.
     */
    export function handleError(error: string): void;
    /**
     * "templates" ディレクトリからのパスを取得.
     *
     * @param  {String} target ターゲットを指定. null の場合は、templates を返却
     * @return {String} templates/hogehoge
     */
    export function templatePath(target: string): string;
    /**
     * Get spinner instance.
     * CLI helper.
     *
     * @param  {String}  [format]  spinner format string.
     * @param  {Number}  [index]   spinner index defined by cli-spinner. (default: random [0-29])
     * @return {Spinner} cli-spinner instance.
     */
    export function getSpinner(format?: string, index?: number): {
        start: () => void;
        stop: (clean?: boolean) => void;
    };
    /**
     * @interface NormalizeTextOptions
     * @brief normalizeText() に指定するオプション
     */
    export interface NormalizeTextOptions {
        eol?: string;
        bom?: boolean;
        tab?: number;
    }
    /**
     * Normalize text line-feed.
     * for windows git user.
     *
     * @param  {String}               text      input text.
     * @param  {NormalizeTextOptions} [options] option.
     * @return {String} normalized text.
     */
    export function normalizeText(text: string, options?: NormalizeTextOptions): string;
    /**
     * @interface ExecCommandOptions
     * @brief execCommand() に指定するオプション
     */
    export interface ExecCommandOptions extends SpawnOptions {
        spinner?: {
            format?: string;
            index?: number;
        };
        stdout?: (data: string) => void;
        stderr?: (data: string) => void;
    }
    /**
     * Execute command line by spawn.
     * call spawn. if error occured, cui is killed proccess.
     *
     * @param   {String}               command    main command. ex) "cordova"
     * @param   {String[]}             args       command args. ex) ["plugin", "add", pluginName]
     * @param   {ExecCommandOptions}   [options]  cli-spinner"s options.
     * @returns {Number} error code
     */
    export function execCommand(command: string, args: string[], options?: ExecCommandOptions): Promise<number>;
    /**
     * @interface CopyTemplateOptions
     * @brief copyTpl() に指定するオプション
     */
    export interface CopyTemplateOptions extends NormalizeTextOptions {
        delimiters?: "{{ }}" | "<% %>";
    }
    /**
     * Copy template with hogan.
     * sync function
     *
     * @param {String}               src       source file path.
     * @param {String}               dst       destination file path.
     * @param {Object}               params    template parameters.
     * @param {CopyTemplateOptions}  [options] options object.
     */
    export function copyTpl(src: string, dst: string, params: Object, options?: CopyTemplateOptions): void;
    /**
     * GUID generate.
     * returned as Windows registry type format.
     *
     * @return {String}
     */
    export function createGUID(): string;
    /**
     * Create XML DOM node.
     *
     * @param   str  string xml format. ex) "<preference name="DisallowOverscroll" value="true"/>"
     * @returns XML Node instance
     */
    export function str2XmlNode(str: string): JQuery;
    /**
     * Create XML string from DOM node.
     *
     * @param  {String} str  string xml format. ex) "<preference name="DisallowOverscroll" value="true"/>"
     * @return {jQuery} XML Node instance
     */
    export function xmlNode2Str($xml: JQuery): string;
    /**
     * @interface FormatXmlOptions
     * @brief formatXML() に指定するオプション
     */
    export interface FormatXmlOptions extends NormalizeTextOptions {
        step?: number;
    }
    /**
     * XML formatter.
     *
     * @param  {String}           str       string xml format. ex) "<preference name="DisallowOverscroll" value="true"/>"
     * @param  {FormatXmlOptions} [options] options object.
     * @return {String} formatted XML
     */
    export function formatXML(str: string, options?: FormatXmlOptions): string;
}

declare module "cdp-lib/utils/settings" {
    /**
     * @interface IGlobalSettings
     * @brief グローバル設定インターフェイス
     */
    export interface IGlobalSettings {
        force?: boolean;
        verbose?: boolean;
        silent?: boolean;
        targetDir?: string;
        lang?: "en-US" | "ja-JP";
    }
    /**
     * 設定取得
     *
     * @returns options ログに使用するオプション
     */
    export function getSettings(): IGlobalSettings;
    /**
     * 設定指定
     *
     * @param options ログに使用するオプション
     */
    export function setSettings(settings: IGlobalSettings): void;
    /**
     * "cdp-lib" が存在するパスを取得
     *
     * @returns cdp-lib への path
     */
    export function getLibPath(): string;
    /**
     * 指定された targetDir を取得
     *
     * @returns targetDir への path
     */
    export function getTargetDir(): string;
    /**
     * ログ出力
     * console.log() と同等
     *
     * @param message        出力メッセージ
     * @param optionalParams 付加情報
     */
    export function log(message?: string, ...optionalParams: any[]): void;
    /**
     * 詳細ログ出力
     * console.debug() と同等
     *
     * @param message        出力メッセージ
     * @param optionalParams 付加情報
     */
    export function debug(message?: string, ...optionalParams: any[]): void;
    /**
     * 検証
     * console.assert() と同等
     *
     * @param test           検証する式
     * @param message        出力メッセージ
     * @param optionalParams 付加情報
     */
    export function assert(test?: boolean, message?: string, ...optionalParams: any[]): void;
    /**
     * ローカライズ
     *
     * @param key キー文字列
     * @returns 翻訳された文字列
     */
    export function translate(key: string): string;
}

declare module "cdp-lib/generators/base" {
    export * from "cdp-lib/generators/base/interfaces";
    export * from "cdp-lib/generators/base/generator-base";
}

declare module "cdp-lib/generators/library" {
    import { GeneratorBase, IProjectConfigration } from "cdp-lib/generators/base";
    export * from "cdp-lib/generators/library/interfaces";
    export * from "cdp-lib/generators/library/generator-module";
    /**
      * generator 生成関数
      */
    export function newGeneratorLibrary(config: IProjectConfigration): GeneratorBase;
}

declare module "cdp-lib/generators/mobile" {
    import { GeneratorBase, IProjectConfigration } from "cdp-lib/generators/base";
    export * from "cdp-lib/generators/mobile/interfaces";
    export * from "cdp-lib/generators/mobile/generator-cordova";
    /**
      * generator 生成関数
      */
    export function newGeneratorMobile(config: IProjectConfigration): GeneratorBase;
}

declare module "cdp-lib/generators/desktop" {
    import { GeneratorBase, IProjectConfigration } from "cdp-lib/generators/base";
    export * from "cdp-lib/generators/desktop/interfaces";
    export * from "cdp-lib/generators/desktop/generator-electoron";
    /**
      * generator 生成関数
      */
    export function newGeneratorDesktop(config: IProjectConfigration): GeneratorBase;
}

declare module "cdp-lib/generators/web" {
    import { GeneratorBase, IProjectConfigration } from "cdp-lib/generators/base";
    export * from "cdp-lib/generators/web/interfaces";
    export * from "cdp-lib/generators/web/generator-browser";
    /**
      * generator 生成関数
      */
    export function newGeneratorWeb(config: IProjectConfigration): GeneratorBase;
}

declare module "cdp-lib/generators/base/interfaces" {
    import * as Utils from "cdp-lib/utils";
    export { Utils };
    /**
     * @interface ISourceDirctoryConfigration
     * @brief ソースディレクトリのコンフィギュレーション設定
     */
    export interface ISourceDirctoryConfigration {
        script?: string;
        stylesheet?: string;
        template?: string;
    }
    /**
     * @interface IBaseStructureConfigration
     * @brief プロジェクトディレクトリのコンフィギュレーション設定
     */
    export interface IBaseStructureConfigration {
        src?: string;
        pkg?: string;
        built?: string;
        doc?: string;
        task?: string;
        test?: string;
        types?: string;
        temp?: string;
        srcConfig?: ISourceDirctoryConfigration;
        lib?: string;
        external?: string;
        porting?: string;
        res?: string;
    }
    /**
     * @interface IDependency
     * @brief package.json に指定する dependencies 情報を格納するインターフェイス
     */
    export interface IDependency {
        name: string;
        version?: string;
        es?: string[];
    }
    /**
     * @interface IProjectConfigration
     * @brief プロジェクト共通のコンフィギュレーション設定
     */
    export interface IProjectConfigration {
        projectName: string;
        projectType: string;
        action: string;
        version: string;
        license: string;
        private?: boolean;
        settings: Utils.IGlobalSettings;
        moduleName?: string;
        mainBaseName?: string;
        namespace?: string;
        structureConfig?: IBaseStructureConfigration;
        copyright?: string;
        devDependencies?: IDependency[];
    }
    /**
     * @interface IBuildTargetConfigration
     * @brief ビルドターゲットコンフィギュレーション設定
     */
    export interface IBuildTargetConfigration {
        es?: "es5" | "es2015";
        module?: "none" | "commonjs" | "amd" | "umd";
        env?: "web" | "node" | "electron" | "electron-renderer";
        nodejs?: boolean;
        minify?: boolean;
        tools?: string[];
        outputSameDir?: boolean;
    }
    /**
     * @interface IWebpackConfigration
     * @brief Webpack 用コンフィギュレーション設定
     */
    export interface IWebpackConfigration {
        nodejs: boolean;
        guide: boolean;
        taskPath: string;
    }
    /**
     * @interface IVisualStudioConfigration
     * @brief Visual Studio 用コンフィギュレーション設定
     */
    export interface IVisualStudioConfigration extends IBaseStructureConfigration {
        projectName: string;
        projectGUID: string;
        mainBaseName: string;
        license: boolean;
        webpack: boolean;
        testem: boolean;
        outputSameDir: boolean;
        tsGroup: {
            relativePath: string;
            fileName: string;
            dependee: boolean;
            map: boolean;
        }[];
        jsGroup: {
            relativePath: string;
            fileName: string;
            dependee: boolean;
            d_ts: boolean;
            map: boolean;
            min_map: boolean;
        }[];
    }
}

declare module "cdp-lib/generators/base/generator-base" {
    import { glob } from "cdp-lib/utils";
    import { IBaseStructureConfigration, IDependency, IProjectConfigration } from "cdp-lib/generators/base/interfaces";
    /**
     * @class GeneratorBase
     * @brief すべての Generator の既定クラス
     */
    export abstract class GeneratorBase {
        protected _config: IProjectConfigration;
        /**
         * constructor
         *
         * @param {IProjectConfigration} config コンフィグ
         */
        constructor(_config: IProjectConfigration);
        /**
         * 処理開始 (エントリ)
         *
         */
        run(): Promise<void>;
        abstract defaultBaseStructure(): IBaseStructureConfigration;
        abstract create(): Promise<void>;
        readonly abstract taskList: string[];
        /**
         * 進捗テキストを通知
         *
         * @param key ローカライズリソースキーを指定
         */
        protected progress(key: string): void;
        /**
         * 警告テキストを通知
         *
         * @param key ローカライズリソースキーを指定
         */
        protected warn(key: string): void;
        /**
         * work directory の変更
         *
         * @param directory target directory.
         */
        protected chdir(directory: string): void;
        /**
         * project root directory の取得
         *
         * @param {String} directory target directory.
         */
        protected readonly rootDir: string;
        /**
         * template directory を指定して配下のファイルをコピー
         * IBaseStructureConfigration の設定が反映される
         *
         * @param {String} target  ターゲットを指定. null の場合は、templates を返却
         * @param {String} dstRoot コピー先を指定. 指定が無い場合は rootDir が設定
         */
        protected copyTplDir(target: string, dstRoot?: string, options?: glob.IOptions): void;
        /**
         * node module の version 取得
         *
         * @param {Promise<string>} version text
         */
        protected queryNodeModuleLatestVersion(name: string): Promise<string>;
        /**
         * 既定の開発時の依存モジュールリストの取得
         * 必要に応じてオーバーライド
         *
         * @return {IDependency}
         */
        protected readonly defaultDevDependencies: IDependency[];
        /**
         * dependencies の template paramaeter を取得
         *
         * @param  {IDependency[]} dependencies 依存関係リスト
         * @return {{ name: string; version: string; last?: boolean; }[]} テンプレートパラメータに指定する配列
         */
        protected queryDependenciesParam(dependencies: IDependency[]): Promise<{
            name: string;
            version: string;
            last?: boolean;
        }[]>;
        /**
         * webpack.config.js の template paramaeter を取得
         *
         * @return {String} libraryTarget に指定する文字列
         */
        protected queryWebpackLibraryTarget(): string;
        /**
         * eslintrc の env に指定する template paramaeter を取得
         *
         * @return {Object} env に指定するテンプレートパラメータオブジェクト
         */
        protected queryEsLintEnvParam(): any;
        /**
         * IBuildTargetConfigration.tools プロパティの指定状況を取得
         *
         * @param  {String}  name ツール名を指定
         * @return {Boolean} true: 指定されている / false: 指定されていない
         */
        protected isEnableTool(name: string): boolean;
    }
}

declare module "cdp-lib/generators/library/interfaces" {
    import { IProjectConfigration, IBuildTargetConfigration } from "cdp-lib/generators/base";
    /**
      * @interface ILibraryConfigration
      * @brief library module プロジェクトのコンフィギュレーション設定
      */
    export interface ILibraryConfigration extends IProjectConfigration, IBuildTargetConfigration {
        projectType: "library";
        env?: "node" | "web" | "electron" | "electron-renderer";
    }
}

declare module "cdp-lib/generators/library/generator-module" {
    import { IBaseStructureConfigration, IDependency, GeneratorBase } from "cdp-lib/generators/base";
    /**
     * @class GeneratorModule
     * @brief Library Module 用 Generator クラス
     */
    export class GeneratorModule extends GeneratorBase {
        /**
         * 既定の directory 構造を返却
         */
        defaultBaseStructure(): IBaseStructureConfigration;
        /**
         * create action entry
         * @param {ILibraryConfigration} config コンフィグ設定
         */
        create(): Promise<void>;
        /**
         * 必要とする task script 一覧を返却. action: create のときに呼ばれる
         */
        readonly taskList: string[];
        /**
         * 開発時の依存モジュールリストの取得
         * 必要に応じてオーバーライド
         *
         * @return {IDependency}
         */
        protected readonly defaultDevDependencies: IDependency[];
    }
}

declare module "cdp-lib/generators/mobile/interfaces" {
    import { IProjectConfigration, IBuildTargetConfigration, IDependency } from "cdp-lib/generators/base";
    /**
     * @interface IExternalModuleInfo
     * @brief 外部ライブラリの定義
     */
    export interface IExternalModuleInfo {
        acquisition: "npm" | "npm:dev" | "cordova" | "resource";
        regular: boolean;
        subset?: IExternalModules;
    }
    /**
     * @interface IExternalModules
     * @brief 外部ライブラリの一覧定義
     */
    export interface IExternalModules {
        [name: string]: IExternalModuleInfo;
    }
    /**
     * @interface IMobileAppConfigration
     * @brief mobile プロジェクトのコンフィギュレーション設定
     */
    export interface IMobileAppConfigration extends IProjectConfigration, IBuildTargetConfigration {
        projectType: "mobile";
        env?: "web";
        appName: string;
        appId?: string;
        platforms?: string[];
        projectStructure?: ["lib" | "porting"];
        external?: IExternalModules;
        dependencies?: IDependency[];
        cordova_plugin?: IDependency[];
        resource_addon?: IDependency[];
        cordovaPackageJson?: any;
    }
}

declare module "cdp-lib/generators/mobile/generator-cordova" {
    import { IBaseStructureConfigration, IDependency, GeneratorBase } from "cdp-lib/generators/base";
    /**
     * @class GeneratorCordova
     * @brief Mobile Cordova 用 Generator クラス
     */
    export class GeneratorCordova extends GeneratorBase {
        /**
         * 既定の directory 構造を返却
         */
        defaultBaseStructure(): IBaseStructureConfigration;
        /**
         * create action entry
         * @param {ILibraryConfigration} config コンフィグ設定
         */
        create(): Promise<void>;
        /**
         * 必要とする task script 一覧を返却. action: create のときに呼ばれる
         */
        readonly taskList: string[];
        /**
         * 開発時の依存モジュールリストの取得
         * 必要に応じてオーバーライド
         *
         * @return {IDependency}
         */
        protected readonly defaultDevDependencies: IDependency[];
    }
}

declare module "cdp-lib/generators/desktop/interfaces" {
    import { IProjectConfigration, IBuildTargetConfigration } from "cdp-lib/generators/base";
    /**
      * @interface IDesktopAppConfigration
      * @brief mobile プロジェクトのコンフィギュレーション設定
      */
    export interface IDesktopAppConfigration extends IProjectConfigration, IBuildTargetConfigration {
        projectType: "desktop";
        env?: "web" | "electron-renderer";
    }
}

declare module "cdp-lib/generators/desktop/generator-electoron" {
    import { IBaseStructureConfigration, GeneratorBase } from "cdp-lib/generators/base";
    /**
     * @class GeneratorElectron
     * @brief Desktop Electron 用 Generator クラス
     */
    export class GeneratorElectron extends GeneratorBase {
        /**
         * 既定の directory 構造を返却
         */
        defaultBaseStructure(): IBaseStructureConfigration;
        /**
         * create action entry
         * @param {IDesktopAppConfigration} config コンフィグ設定
         */
        create(): Promise<void>;
        /**
         * 必要とする task script 一覧を返却. action: create のときに呼ばれる
         */
        readonly taskList: string[];
    }
}

declare module "cdp-lib/generators/web/interfaces" {
    import { IProjectConfigration, IBuildTargetConfigration } from "cdp-lib/generators/base";
    /**
      * @interface IWebAppConfigration
      * @brief web プロジェクトのコンフィギュレーション設定
      */
    export interface IWebAppConfigration extends IProjectConfigration, IBuildTargetConfigration {
        projectType: "web";
        env?: "web";
    }
}

declare module "cdp-lib/generators/web/generator-browser" {
    import { IBaseStructureConfigration, GeneratorBase } from "cdp-lib/generators/base";
    /**
     * @class GeneratorBrowser
     * @brief Web Browser 用 Generator クラス
     */
    export class GeneratorBrowser extends GeneratorBase {
        /**
         * 既定の directory 構造を返却
         */
        defaultBaseStructure(): IBaseStructureConfigration;
        /**
         * create action entry
         * @param {ILibraryConfigration} config コンフィグ設定
         */
        create(): Promise<void>;
        /**
         * 必要とする task script 一覧を返却. action: create のときに呼ばれる
         */
        readonly taskList: string[];
    }
}

