import { createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import {
    initializeData,
    initializePlugins,
    initializeIntegrationInstances,
    onPageUnload,
} from '@/_common/helpers/data';
import { convertPathToRouterFormat } from '@/_common/helpers/urlParametersParsing';
import { getRuntimeEnvironment } from '@/helpers/frontEnv.js';
import { useBackAuthStore } from '@/pinia/backAuth.js';

/**
 * @typedef {import('vue-router').Router} Router
 * @typedef {import('vue-router').RouteRecordRaw} RouteRecordRaw
 * @typedef {import('vue-router').RouterOptions} RouterOptions
 * @typedef {import('vue-router').RouterScrollBehavior} RouterScrollBehavior
 */

/**
 * @typedef {Object} Lang
 * @property {string} lang
 * @property {boolean} [default]
 * @property {boolean} [isDefaultPath]
 */

/**
 * @typedef {Object} PageSecurity
 * @property {'authenticated' | string} [accessRule]
 * @property {string[]} [accessRoles]
 * @property {'AND' | 'OR'} [accessRolesCondition]
 */

/**
 * @typedef {Object} Page
 * @property {string} id
 * @property {Record<string, string> & { default: string }} paths
 * @property {string[]} langs
 * @property {PageSecurity} [security]
 * @property {{ userGroup: string }[]} [pageUserGroups]
 */

/**
 * @typedef {Object} DesignInfo
 * @property {string} homePageId
 * @property {Page[]} pages
 * @property {Lang[]} langs
 * @property {unknown} [auth]
 * @property {{ href?: string }} [baseTag]
 */

/** @type {Router} */
let router;
/** @type {RouteRecordRaw[]} */
const routes = [];

/** @type {RouterScrollBehavior} */
const scrollBehavior = to => {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
};

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

window.wwg_designInfo = {"id":"bfbab27e-4e1d-4ab4-be1d-3425de1e162d","homePageId":"2da131d0-e87f-4533-8226-a9ae1ffa754a","authPluginId":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","baseTag":null,"defaultTheme":"light","langs":[{"lang":"en","default":false,"isDefaultPath":false},{"lang":"pt","default":true}],"background":{},"workflows":[],"back":{"isServerSetup":{"staging":false,"production":false}},"auth":null,"pages":[{"id":"08cf37d6-c28c-47d8-a076-a19ebdeb516f","linkId":"08cf37d6-c28c-47d8-a076-a19ebdeb516f","name":"WhatsApp | IA","folder":null,"paths":{"en":"whats-ia","default":"whats-ia"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"5551ce28-00b4-4067-b5ef-910281543f83","sectionTitle":"Content","linkId":"7f313bba-a4b5-4301-bf99-e4c6f1398805"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | WhatsApp","fr":"Vide | Commencer à partir de zéro","pt":"Supra Sorte | WhatsApp IA"},"meta":{"desc":{"en":"App Tournieux | WhatsApp","pt":"Supra Sorte | WhatsApp IA"},"keywords":{},"socialDesc":{"en":"App Tournieux | WhatsApp"},"socialTitle":{"en":"App Tournieux | WhatsApp"},"structuredData":{}},"metaImage":"images/supra-card-login.png?_wwcv=74","security":{}},{"id":"8751cc9b-5a24-4dd2-85a8-dc1e9bba70af","linkId":"8751cc9b-5a24-4dd2-85a8-dc1e9bba70af","name":"WhatsApp | User","folder":null,"paths":{"pt":"whats-user","default":"whats-user"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"427ab905-a68b-41b9-a542-863ddceca4ae","sectionTitle":"Content","linkId":"ddfa47e7-6928-41d1-962a-70f02bbcdcf2"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | WhatsApp","fr":"Vide | Commencer à partir de zéro","pt":"Supra Sorte | WhatsApp IA"},"meta":{"desc":{"en":"App Tournieux | WhatsApp","pt":"Supra Sorte | WhatsApp IA"},"keywords":{},"socialDesc":{"en":"App Tournieux | WhatsApp"},"socialTitle":{"en":"App Tournieux | WhatsApp"},"structuredData":{}},"metaImage":"images/supra-card-login.png?_wwcv=74","security":{}},{"id":"218ec337-2632-419d-a070-8fe9ac9bb44e","linkId":"218ec337-2632-419d-a070-8fe9ac9bb44e","name":"Users","folder":null,"paths":{"en":"users","default":"users"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"4bd57cee-d7f0-4991-86f8-57b7a46cb7ac","sectionTitle":"Content","linkId":"6271a9ca-81dc-4105-8a94-44087979973f"},{"uid":"9f670f3f-e3b1-4653-a304-cff684f19fb3","sectionTitle":"Modal","linkId":"b473a8bc-ea8b-47bf-9895-8fb6f79c5164"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | User"},"meta":{"desc":{"en":"App Tournieux | User"},"keywords":{},"socialDesc":{"en":"App Tournieux | User"},"socialTitle":{"en":"App Tournieux | User"},"structuredData":{}},"metaImage":"images/logo_clinica_tourniex.png?_wwcv=74","security":{}},{"id":"75d54667-b693-4b51-8eca-8fb85117c915","linkId":"75d54667-b693-4b51-8eca-8fb85117c915","name":"Agenda","folder":null,"paths":{"en":"agenda","default":"agenda"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"c6ef6cec-8d97-4ab5-b04f-d0513e13fc2b","sectionTitle":"Content","linkId":"3124ff64-0a79-4949-a0d3-eed581f2d1e5"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | Agenda","fr":"Vide | Commencer à partir de zéro","pt":"Supra Sorte | Agenda"},"meta":{"desc":{"en":"App Tournieux | Agenda","pt":"Supra Sorte | Agenda"},"keywords":{},"socialDesc":{"en":"App Tournieux | Agenda"},"socialTitle":{"en":"App Tournieux | Agenda"},"structuredData":{}},"metaImage":"images/supra-card-login.png?_wwcv=74","security":{}},{"id":"2da131d0-e87f-4533-8226-a9ae1ffa754a","linkId":"2da131d0-e87f-4533-8226-a9ae1ffa754a","name":"Home","folder":null,"paths":{"en":"home","default":"home"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"c0d39357-3e19-42db-87af-b3d1fb0fd00e","sectionTitle":"Content","linkId":"f68cb9f6-bdea-4e51-a290-ebd9adb35696"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | Home","fr":"Vide | Commencer à partir de zéro","pt":"Supra Sorte | Home"},"meta":{"desc":{"en":"App Tournieux | Home","pt":"Supra Sorte | Home"},"keywords":{},"socialDesc":{"en":"App Tournieux"},"socialTitle":{"en":"App Tournieux | Home"},"structuredData":{}},"metaImage":"images/supra-card-login.png?_wwcv=74","security":{}},{"id":"dc78fc4a-1d7e-4b00-969f-36a655fc206a","linkId":"dc78fc4a-1d7e-4b00-969f-36a655fc206a","name":"Contatos | Lista","folder":null,"paths":{"en":"contatos-lista","default":"contatos-lista"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"bce0c98a-0051-436e-9077-15d7697d8258","sectionTitle":"Content","linkId":"77b2643b-4f69-40ca-bb5b-c77a01dc652a"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | Contatos","fr":"Vide | Commencer à partir de zéro","pt":"Supra Sorte | Lista"},"meta":{"desc":{"en":"App Tournieux | Contatos","pt":"Supra Sorte | Lista"},"keywords":{},"socialDesc":{"en":"App Tournieux | Contatos"},"socialTitle":{"en":"App Tournieux | Contatos"},"structuredData":{}},"metaImage":"images/supra-card-login.png?_wwcv=74","security":{}},{"id":"52a474bd-0f6c-4b1f-97eb-db910f67d590","linkId":"52a474bd-0f6c-4b1f-97eb-db910f67d590","name":"Profissionais","folder":null,"paths":{"en":"profissionais","default":"profissionais"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"8a09f8f0-f8ad-4f39-a678-c7eae2e419ce","sectionTitle":"Content","linkId":"5efff023-751d-456d-8090-efbae091fc4a"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | Profissionais","fr":"Vide | Commencer à partir de zéro","pt":"Supra Sorte | Profissionais"},"meta":{"desc":{"en":"App Tournieux | Profissionais","pt":"Supra Sorte | Profissionais"},"keywords":{},"socialDesc":{"en":"App Tournieux | Profissionais"},"socialTitle":{"en":"App Tournieux | Profissionais"},"structuredData":{}},"metaImage":"images/supra-card-login.png?_wwcv=74","security":{}},{"id":"ff6b653f-08e0-474a-8d29-fdb3524ea505","linkId":"ff6b653f-08e0-474a-8d29-fdb3524ea505","name":"Meu WhatsApp","folder":null,"paths":{"pt":"meu-whatsapp","default":"meu-whatsapp"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"53d2dded-add1-4476-8945-91c09f1d19fa","sectionTitle":"Content","linkId":"262ed8e4-e15d-429c-8b15-2df6205c74ee"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | WhatsApp","fr":"Vide | Commencer à partir de zéro","pt":"Supra Sorte | WhatsApp"},"meta":{"desc":{"en":"App Tournieux | WhatsApp","pt":"Supra Sorte | WhatsApp"},"keywords":{},"socialDesc":{"en":"App Tournieux | WhatsApp"},"socialTitle":{"en":"App Tournieux | WhatsApp"},"structuredData":{}},"metaImage":"images/supra-card-login.png?_wwcv=74","security":{}},{"id":"74e1cad6-5056-4313-b0a7-e3058bc3ff97","linkId":"74e1cad6-5056-4313-b0a7-e3058bc3ff97","name":"Locais","folder":null,"paths":{"en":"deals","default":"deals"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"cb78880e-8f1a-4f7d-b973-38a81a79f47d","sectionTitle":"Content","linkId":"d9a2a5c6-0091-404c-8860-cc25b6f6cd78"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | Locais"},"meta":{"desc":{"en":"App Tournieux | Locais"},"keywords":{},"socialDesc":{"en":"App Tournieux | Locais"},"socialTitle":{"en":"App Tournieux | Locais"},"structuredData":{}},"metaImage":"images/logo_clinica_tourniex.png?_wwcv=74","security":{}},{"id":"b8b4260a-02d7-412a-bddd-f297861a74d2","linkId":"b8b4260a-02d7-412a-bddd-f297861a74d2","name":"IA | Treinamento","folder":null,"paths":{"en":"treinamento","default":"treinamento"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"b91fef41-49d2-480b-94e9-454ce437f664","sectionTitle":"Content","linkId":"6f3362c9-d223-40a2-8d09-92f6fd10dd13"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | IA","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{"en":"App Tournieux | IA"},"keywords":{},"socialDesc":{"en":"App Tournieux | IA"},"socialTitle":{"en":"App Tournieux | IA"},"structuredData":{}},"metaImage":"images/logo_clinica_tourniex.png?_wwcv=74","security":{}},{"id":"72d155a7-c3ee-4b82-80a3-8dadeefc48ca","linkId":"72d155a7-c3ee-4b82-80a3-8dadeefc48ca","name":"Template","folder":null,"paths":{"en":"template","default":"template"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"3c1a7636-2d0e-41c2-9cf8-7e0ca8772c2d","sectionTitle":"Content","linkId":"0fed524d-bb3e-402f-a2e4-82a722bcc0b5"}],"pageUserGroups":[{}],"title":{"en":"Blank | Start from scratch","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"a91a7388-b87f-4857-80de-c9693b3ce8e9","linkId":"a91a7388-b87f-4857-80de-c9693b3ce8e9","name":"Log in","folder":null,"paths":{"en":"log_in","default":"log_in"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"fcecb369-8dcd-465a-97e2-390d822b9de2","sectionTitle":"Sign in","linkId":"6e6c6034-7a03-4d90-b22a-07965a537932"},{"uid":"a05de4ea-1bb1-49c5-99d3-ec5d1cd170f2","sectionTitle":"Login","linkId":"6e3e4487-ab4f-47a5-b649-29f3d1cd8666"}],"pageUserGroups":[],"title":{"en":"App Tournieux | Login","pt":"Supra Sorte | Login"},"meta":{"desc":{"en":"App Tournieux | Login","pt":"Supra Sorte | Login"},"keywords":{},"socialDesc":{"en":"App Tournieux | Avisos"},"socialTitle":{"en":"App Tournieux | Login"},"structuredData":{}},"metaImage":"images/supra-card-login.png?_wwcv=74","security":{}},{"id":"98d76a92-acd8-4baf-bfa1-a952d7559ea1","linkId":"98d76a92-acd8-4baf-bfa1-a952d7559ea1","name":"Configurações","folder":null,"paths":{"en":"settings","default":"settings"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"41c14e72-9600-41c1-b1bf-36d2c8b6eab5","sectionTitle":"Content","linkId":"da50435c-594c-4c49-9959-baa9f60af409"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | Configuração","fr":"Vide | Commencer à partir de zéro","pt":"Supra Sorte | Home"},"meta":{"desc":{"en":"App Tournieux | Configuração","pt":"Supra Sorte | Home"},"keywords":{},"socialDesc":{"en":"App Tournieux | Configurações"},"socialTitle":{"en":"App Tournieux | Configurações"},"structuredData":{}},"metaImage":"images/logo_clinica_tourniex.png?_wwcv=74","security":{}},{"id":"2927ad34-8b0a-4006-8473-604e7553d8cb","linkId":"2927ad34-8b0a-4006-8473-604e7553d8cb","name":"Usuário","folder":null,"paths":{"pt":"user","default":"user"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"3e489e64-c85a-4586-85a6-ff1ad7410474","sectionTitle":"Content","linkId":"9e5ddeb2-6549-4525-ad56-90693dea5025"},{"uid":"fd869659-a683-421d-b2af-d53b75f72523","sectionTitle":"Content","linkId":"00bd0ddb-3522-4a3a-b751-c0ab001efd9f"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | Profissionais","fr":"Vide | Commencer à partir de zéro","pt":"Supra Sorte | Profissionais"},"meta":{"desc":{"en":"App Tournieux | Profissionais","pt":"Supra Sorte | Profissionais"},"keywords":{},"socialDesc":{"en":"App Tournieux | Profissionais"},"socialTitle":{"en":"App Tournieux | Profissionais"},"structuredData":{}},"metaImage":"images/supra-card-login.png?_wwcv=74","security":{}},{"id":"119108ea-4ce7-4627-a977-c0ab418d0d2d","linkId":"119108ea-4ce7-4627-a977-c0ab418d0d2d","name":"Contatos | Planilha","folder":null,"paths":{"pt":"contatos-planilha","default":"contatos-planilha"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"2e25b27c-54ee-4ac9-97e8-2ee11265a3c8","sectionTitle":"Content","linkId":"3d3166ac-a062-4b8b-bd17-6293fa22f93d"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | Contatos","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{"en":"App Tournieux | Contatos"},"keywords":{},"socialDesc":{"en":"App Tournieux | Contatos"},"socialTitle":{"en":"App Tournieux | Contatos"},"structuredData":{}},"metaImage":"images/logo_clinica_tourniex.png?_wwcv=74","security":{}},{"id":"877d6131-de37-4f45-b9f9-4253122363d8","linkId":"877d6131-de37-4f45-b9f9-4253122363d8","name":"Contatos | Kanban","folder":null,"paths":{"en":"contatos-kanban","default":"contatos-kanban"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"51f97142-cb23-4939-9fe6-2b272825306c","sectionTitle":"Content","linkId":"3106cbcd-02f6-44f6-b006-93d40055e895"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | Contatos","fr":"Vide | Commencer à partir de zéro","pt":"Supra Sorte | Kanban"},"meta":{"desc":{"en":"App Tournieux | Contatos","pt":"Supra Sorte | Kanban"},"keywords":{},"socialDesc":{"en":"App Tournieux | Contatos"},"socialTitle":{"en":"App Tournieux | Contatos"},"structuredData":{}},"metaImage":"images/supra-card-login.png?_wwcv=74","security":{}},{"id":"078f2e3c-d94d-423e-83c0-c6a13c5344bb","linkId":"078f2e3c-d94d-423e-83c0-c6a13c5344bb","name":"Relatórios","folder":null,"paths":{"en":"relatorios","default":"relatorios"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"84a09736-9303-471a-895d-c81d1866e8a4","sectionTitle":"Content","linkId":"40cd03e5-cb1d-4bdc-b73c-5990367f6a1c"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | Relatórios","fr":"Vide | Commencer à partir de zéro","pt":"Supra Sorte | Relatórios"},"meta":{"desc":{"en":"App Tournieux | Relatórios","pt":"Supra Sorte | Relatórios"},"keywords":{},"socialDesc":{"en":"App Tournieux | Relatórios"},"socialTitle":{"en":"App Tournieux | Relatórios"},"structuredData":{}},"metaImage":"images/supra-card-login.png?_wwcv=74","security":{}},{"id":"93295d8e-50b9-42e4-991a-6eca18a01e2d","linkId":"93295d8e-50b9-42e4-991a-6eca18a01e2d","name":"zapneuronz","folder":null,"paths":{"pt":"zapneuronz","default":"zapneuronz"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"ff3b88a3-ce20-4671-9f79-693739f76d8d","sectionTitle":"Section-whats","linkId":"0b7a5a9e-d7c7-4c31-ad1b-1910686ec827"},{"uid":"bba2422b-a2ae-4173-af43-19efe840b020","sectionTitle":"Section-instance","linkId":"5d181975-3fad-4fc0-885a-1e653da762ee"},{"uid":"a7a9163b-1a95-44b2-ace6-12f366ddd5db","sectionTitle":"whats-clopne","linkId":"02a55352-4a4b-4e97-9795-7005563273b4"}],"pageUserGroups":[{}],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"e37ee4e6-8920-4c00-9b11-214919ac3658","linkId":"e37ee4e6-8920-4c00-9b11-214919ac3658","name":"Contatos | Alta Prioridade","folder":null,"paths":{"pt":"contatos-alta-prioridade","default":"contatos-alta-prioridade"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"7cc041d2-02e9-4ca4-8f21-8b640a048e67","sectionTitle":"Content","linkId":"10281112-b47f-41ec-862a-01c2b44e4b33"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | Contatos","fr":"Vide | Commencer à partir de zéro","pt":"Supra Sorte | Alta Prioridade"},"meta":{"desc":{"en":"App Tournieux | Contatos","pt":"Supra Sorte | Alta Prioridade"},"keywords":{},"socialDesc":{"en":"App Tournieux | Contatos"},"socialTitle":{"en":"App Tournieux | Contatos"},"structuredData":{}},"metaImage":"images/supra-card-login.png?_wwcv=74","security":{}},{"id":"e65f12cd-2153-491d-9579-8648b6f5b2ec","linkId":"e65f12cd-2153-491d-9579-8648b6f5b2ec","name":"IA | Avisos","folder":null,"paths":{"en":"avisos","default":"avisos"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"15f91c1d-bfe2-441b-b502-860475f216d3","sectionTitle":"Content","linkId":"7c70ea52-89a3-460d-af49-bdc1387c52fd"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | Avisos","fr":"Vide | Commencer à partir de zéro","pt":"Supra Sorte | Avisos"},"meta":{"desc":{"en":"App Tournieux | Avisos","pt":"Supra Sorte | Avisos"},"keywords":{},"socialDesc":{"en":"App Tournieux | Avisos"},"socialTitle":{"en":"App Tournieux | Avisos"},"structuredData":{}},"metaImage":"images/supra-card-login.png?_wwcv=74","security":{}},{"id":"da88afda-2e99-4df7-8d98-d805a641de20","linkId":"da88afda-2e99-4df7-8d98-d805a641de20","name":"Contatos | Sem Responsável","folder":null,"paths":{"pt":"contatos-sem-responsavel","default":"contatos-sem-responsavel"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"c2d7b671-7e78-4a36-91a6-9af9eeddacee","sectionTitle":"Content","linkId":"f8ce31a7-e452-480a-9e43-c125b98fd4e5"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | Contatos","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{"en":"App Tournieux | Contatos"},"keywords":{},"socialDesc":{"en":"App Tournieux | Contatos"},"socialTitle":{"en":"App Tournieux | Contatos"},"structuredData":{}},"metaImage":"images/logo_clinica_tourniex.png?_wwcv=74","security":{}},{"id":"d7d981eb-5e71-4b48-9c0e-8cac2871c2c4","linkId":"d7d981eb-5e71-4b48-9c0e-8cac2871c2c4","name":"Contatos | Média Prioridade","folder":null,"paths":{"pt":"contatos-media-prioridade","default":"contatos-media-prioridade"},"langs":["en","pt"],"cmsDataSetPath":null,"sections":[{"uid":"c4178e11-002a-4e46-b0b9-699816a2b153","sectionTitle":"Sidemenu","linkId":"60e1581e-2cd1-4253-b90a-10887834383c"},{"uid":"14bd5b6a-1d13-451f-9123-496f6cbf8914","sectionTitle":"Header1","linkId":"f3b431a9-d5be-4522-a14f-ed81e619a727"},{"uid":"c90d99a0-c298-42e3-bcf9-22e49e383a37","sectionTitle":"Content","linkId":"fa550a4f-0050-4ebc-9207-13ee5297dd81"}],"pageUserGroups":[{}],"title":{"en":"App Tournieux | Contatos","fr":"Vide | Commencer à partir de zéro","pt":"Supra Sorte | Média"},"meta":{"desc":{"en":"App Tournieux | Contatos","pt":"Supra Sorte | Média"},"keywords":{},"socialDesc":{"en":"App Tournieux | Contatos"},"socialTitle":{"en":"App Tournieux | Contatos"},"structuredData":{}},"metaImage":"images/supra-card-login.png?_wwcv=74","security":{}}],"plugins":[{"id":"f9ef41c3-1c53-4857-855b-f2f6a40b7186","name":"Supabase","namespace":"supabase"},{"id":"29809245-a5ea-4687-af79-952998abab22","name":"Airtable","namespace":"airtable"},{"id":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","name":"Supabase Auth","namespace":"supabaseAuth"},{"id":"9c40819b-4a8f-468f-9ba5-4b9699f3361f","name":"Charts","namespace":"chartjs"},{"id":"832d6f7a-42c3-43f1-a3ce-9a678272f811","name":"Date","namespace":"dayjs"},{"id":"2bd1c688-31c5-443e-ae25-59aa5b6431fb","name":"REST API","namespace":"restApi"}]};
window.wwg_cacheVersion = 74;
window.wwg_pluginsSettings = pluginsSettings;
window.wwg_disableManifest = false;

/** @type {Lang} */
const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {
    lang: 'en',
    default: true,
};

/**
 * @param {Page} page
 * @param {Lang} lang
 * @param {string} [forcedPath]
 */
const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    path = convertPathToRouterFormat(path);

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            const backAuthStore = useBackAuthStore(wwLib.$pinia);
            if (!wwLib.wwAuth.plugin) {
                if (!backAuthStore.projectAuth && window.wwg_designInfo.auth) {
                    backAuthStore.setProjectAuth(window.wwg_designInfo.auth);
                }
            }

            //Init plugins
            await initializePlugins();

            //Init integration instances
            await initializeIntegrationInstances();

            if (!wwLib.wwAuth.plugin) {
                await backAuthStore.refresh();
                const projectAuth = backAuthStore.projectAuth || {};

                //Check if private page
                if (page.security?.accessRule === 'authenticated') {
                    if (!backAuthStore.isAuthenticated) {
                        window.location.href = `${wwLib.wwPageHelper.getPagePath(
                            projectAuth.unauthenticatedPageId
                        )}?_source=${to.path}`;
                        return null;
                    } else if (page.security?.accessRoles?.length) {
                        const hasAccess =
                            page.security.accessRolesCondition === 'AND'
                                ? backAuthStore.matchAllRoles(page.security.accessRoles)
                                : backAuthStore.matchAnyRoles(page.security.accessRoles);
                        if (!hasAccess) {
                            window.location.href = `${wwLib.wwPageHelper.getPagePath(
                                projectAuth.unauthorizedPageId
                            )}?_source=${to.path}`;
                            return null;
                        }
                    }
                }
            } else {
                // Deprecated legacy auth plugins, to remove in the future
                if (page.pageUserGroups?.length) {
                    await wwLib.wwAuth.init();

                    // Redirect to not sign in page if not logged
                    if (!wwLib.wwAuth.getIsAuthenticated()) {
                        window.location.href = `${wwLib.wwPageHelper.getPagePath(
                            wwLib.wwAuth.getUnauthenticatedPageId()
                        )}?_source=${to.path}`;

                        return null;
                    }

                    //Check roles are required
                    if (
                        page.pageUserGroups.length > 1 &&
                        !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
                    ) {
                        window.location.href = `${wwLib.wwPageHelper.getPagePath(
                            wwLib.wwAuth.getUnauthorizedPageId()
                        )}?_source=${to.path}`;

                        return null;
                    }
                }
            }

            try {
                await import(`@/pages/${page.id.split('_')[0]}.js`);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        redirect: null,
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

/** @type {RouterOptions} */
let routerOptions;

const isProd = getRuntimeEnvironment() === 'production';

if (isProd && window.wwg_designInfo.baseTag?.href) {
    let baseTag = window.wwg_designInfo.baseTag.href;
    if (!baseTag.startsWith('/')) {
        baseTag = '/' + baseTag;
    }
    if (!baseTag.endsWith('/')) {
        baseTag += '/';
    }

    routerOptions = {
        history: createWebHistory(baseTag),
        routes,
    };
} else {
    routerOptions = {
        history: createWebHistory(),
        routes,
    };
}

router = createRouter({
    ...routerOptions,
    scrollBehavior,
});

//Trigger on page unload
let isFirstNavigation = true;
router.beforeEach(async (to, from) => {
    if (to.name === from.name) return;
    if (!isFirstNavigation) await onPageUnload();
    isFirstNavigation = false;
    wwLib.globalVariables._navigationId++;
    return;
});

//Init page
router.afterEach((to, from, failure) => {
    wwLib.$store.dispatch('front/showPageLoadProgress', false);
    let fromPath = from.path;
    let toPath = to.path;
    if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
    if (!toPath.endsWith('/')) toPath = toPath + '/';
    if (failure || (from.name && toPath === fromPath)) return;
    initializeData(to);
});
/* wwFront:end */

export default router;
