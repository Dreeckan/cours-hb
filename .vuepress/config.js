const glob = require('glob');

let phpFiles = glob.sync('php/!(README).md');
let phpCdaFiles = glob.sync('php-cda/!(README).md');
let symfonyFiles = glob.sync('symfony/!(README).md');
let ciFiles = glob.sync('ci/**/!(README).md');
let jsFiles = glob.sync('js/**/!(README).md');

module.exports = {
    description: 'Les formations de Rémi Jarjat pour Human Booster',
    searchPlaceholder: 'Chercher...',
    lastUpdated: 'Dernière mise à jour ',
    themeConfig: {
        logo: '/assets/LogoHB.png',
        smoothScroll: true,
        sidebar: [
            '/',
            '/general/',
            '/git/',
            '/linux/',
            {
                title: 'PHP',
                path: '/php/',
                collapsable: true,
                sidebarDepth: 2,
                children: phpFiles
            },
            {
                title: 'PHP pour les CDA',
                path: '/php-cda/',
                collapsable: true,
                sidebarDepth: 2,
                children: phpCdaFiles
            },
            {
                title: 'Symfony',
                path: '/symfony/',
                collapsable: true,
                sidebarDepth: 2,
                children: symfonyFiles
            },
            {
                title: 'Javascript',
                path: '/js/',
                collapsable: true,
                sidebarDepth: 2,
                children: jsFiles
            },
            {
                title: 'Intégration continue',
                path: '/ci/',
                collapsable: true,
                sidebarDepth: 2,
                children: ciFiles
            },
            '/deploy/',
        ]
    },
    plugins: [
        [
            'robots',
            {
                /**
                 * @host
                 * Mandatory, You have to provide the host URL
                 */
                host: "https://formation-hb.drakolab.fr/",
                /**
                 * @disallowAll
                 * Optional: if it's true, all others options are ignored and exclude all robots from the entire server
                 */
                disallowAll: true,
                /**
                 * @allowAll
                 * Optional: if it's true and @disallowAll is false, all others options are ignored and allow all robots complete access
                 */
                allowAll: false
            }
        ],
        ['vuepress-plugin-export']
    ]
}
