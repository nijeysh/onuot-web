import React from 'react';
import RainEffect from './RainEffect';
import SnowEffect from './SnowEffect';
import type { WeatherCondition } from '../common/WeatherIcon';
import { useTheme } from '../../contexts/ThemeContext';

interface WeatherBackgroundProps {
    condition: WeatherCondition;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ condition }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    // Map conditions to specific background images from the Stitch designs
    const getBackgroundImage = () => {
        if (isDarkMode) {
            switch (condition) {
                case 'sunny':
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-_r2AkdZo3cnNljisZUeJQbMXg2ukoCjFBZQeh6KBGYIQlYb3yWt7-BTDC3w138BsnHfxYVYoLUIbqBc-lhQAPwbRpJce3KxiCMfGsvBb4fHIGEezw18gvbozWpggOIS7S5UkKD4jnsKjL6D6kgLJNHz3C16ML0vvN2ZqujK0uFzH3wWIvcUyRvxciYicBFzp41DMJBEHntu-mYpIKe__ViPy4cEQg1J2Tp2C0e89TgPGSpKqo7xKxUhF2WxgJiPFvEy1Zv44xxW')";
                case 'rainy':
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCw5YBURt-O4W3bqeSYTrdnx0CxpNyrVzTuQli25NBYKzaFhsM7UgwjdofukTEUakFYFYRlr0kH7uegSAxgGL9ZK-1F80rwd6ED-cjwQ-WL49ZBqGaxFtp8C6oDNff6MTW45IRnEx8iilgV-xu7mkCKsdyl9klqZ0P7PgJQaId-Jjsso9cEjgocFB8P2GO0Gy2tfOnlWVm3kgKLU9AGnEwJgdmADeLoKYWejiU9K8qPPn3iZhxW3FbuoRI7ckKKHYmv00qb6OvA-h32')";
                case 'snowy':
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBw3VTOZ7kQr-ci9GDZ0Uye30ypfdlCSEDLJKwk-rX_pm7qtbNYlXTEwkhBlJLL2TG2uy0T9YVC577o2gsx9RrcMcxXPX9PEDmp6akk2SCtXgFFRoCID1ejj4GxXxXFo7ObglAD4TSoL67YxsjY_DF79l6EXScfl8uuD-jKadtRGCoj0C4Z1y_jB_w_HWYaoPzKbGPKggq_zatASCVQgWfzbR6UBkFZGsrurVwxSQ676onpZkwDIEuy1KJW4-W0wQrIghPFF4nkQnyl')";
                case 'stormy':
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcTvVJ6LknwJ-2rH79drwLa3tSeyhOlQCfakDLvzej-7g-eVQKNUMsS-_Kf0-0g1aXKNGHW0QGblx2k0K_Ucc6p-F1efmzewLknCblq9yvxGpeOVRlz6nlKjl-BK6gHDs10N6Zm5HmLVDbk-W8QkT5PgDEN1SH9otU0g8e60FTb6SOcuvIiIQvGP7vafxEoT5W_8oKQdWkc8fCf1jfgc2qg50l5JmdXarvWJ_oP2fv1yPaPsR6RzyHPuJOkGfKiVEY1yQQovJwBgcu')";
                case 'cloudy':
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2DmdPf6FG9cug_MszFVMIFOar3aYXTptJdkQJtVanZZ5Itp1724Zh2BWzvsqnzsCo21o4RoQA6vQwd6qaW4TIOehrPDoUfzQz1oviqJd8YspkLmmuJleFYuE06Mx0oUYziE6SKDF5yV_bssqORa53vzspxjna5KadRC0SnTVQUQWXc_fZ8kaiExaGBudAPdIEtlXTf8RHzPmvTwGTeOGsB5YtqDEwOrSApFWOBy1xR-lVUYGIB2XEuQOyXWZk6s_hSFnOlxjxYNbu')";
                case 'partly_cloudy':
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCOcPF3U7udSk-3cr4WgxLS8GTrP9_DeFEg_qtnUqDsIecS1mjo03AUQ4we44DTf0oQDBhSwg8EAA8tabv0IXD9VDWXkpjXp0cgZVnBFDQvjI-etwuGV7Q784ngkCX5xONnGIeKETOQ8oEPVB5Gl_Q5a_4P-1lkUJOIklOI-XXb_-Vz-2b0buJQAc8OnfGXBgcjhvpNs9MYusPZVEFAA1R8qkXXB2ztP5t3JWPlgiWXNo1QzAfOMhdyh0gjB6lmYEdeAC6Ktjkf6xZU')";
                case 'cyclone':
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_AJ90TrSUYhPj0vnWR5K011PrRf5a7ZwC47dmewnbfgG-HWXiSAlOkOVwBK0XKXEXL2eDNyJlVJYy7Xt6PY3y09aB7GyeN1obgm_ZUDbuQuO5iC3CzOMC59B-Su9TmzOEHi_hxd0fI38MN8Et7unQCr2S-saxdt3TgvWSZweYECwOxwYeSLw1FdL0ASZpGiDvpKHol_bFusIc6rFzWIyQB2FJnxITJPCF_kb9U-LAVfsoJ2X_XOWDXhseavvgUHa2TvQE1DuPfiqV')";
                default:
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBfQVP-j5-TLyztubiGCfuprQGvw2Fzhz6U8Q1orjxoWziAXvbg_2sxnQXsKxG0v-eJZbB_J97TIOtz1vfav5sOYqCUenEZRuT-6emxwo1qBR4t0nPmJoXXTl-ybBbn7xYnqRPyXjsvynTDyoKkjR3LTF6RPKT2GMg72Gs0D16rJg-58UZUnUkRN69uSvpa5Yn-7-mxmC-FORj1Ksk_Jj3GiZmKYca3Ubeksos7OFzHu9ZsKTPurTbksIBgwrMgcBUN7QTthWuxQLPT')";
            }
        } else {
            // Light Mode
            switch (condition) {
                case 'sunny':
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBw7zBF_NR0FARc9Ml6uCgLhQ-5dH2VKCLR2jLNEIei0xzNGUfLoYOszj67S-YTxuLtR_Tg_9ViMe_Iu8PaOgylZn_WVyJaWLvRZFH_VaTQXe0uMzzq2E9PNT3Ogn088eDfYWCj12euQJ1uIj8Wk8d3qCen0l_Z3Ep7CJ0oG7MfIqh2XncP5pEC1oITNsVGX9vMADhTf2QolpLLTdnTfdKa3OyiO4WEyF78EG3u0cs53U6OxySXkG0x8oWAVUuc2toEyw9Ema9uu3ll')";
                case 'rainy':
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDCRYYf8iJ7CBGmCNB2JWnHd8NFEb6pe8NqW_dloI-IRAkRKfuZHQEED58FwPqgwgmix-Ym-kFYlolLobMHUlbN5h_Qym3xSOr6AEWrjpxTrxBm6u9465sy6v8Jp_auTK7yT-U6J3wRG--LWoQIQFuz35bD-WgMCGMbJys1mZ_hM9otNHFhgijzCMqR59mjef8btJTZKArMeX2L1lQJLeyxRDDbEGXP2WS8hGmpD_TorVCwSHF1Ci4TzwXYEU5rkD1_bi9_zZV6iiR6')";
                case 'snowy':
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDULCUXL8jUSVaR5eBERb_tV4aIEkT8lqZ6sLmSqRnKnza9s_9exH29SmCFwciB7uTAcwnKYuK8CbaKvFWWP6OK1c6HjR2rB8n51NcEfEql2h57WSPj1aFOkcWe4Oz_9aIsZ2ctnhchWpZ7Ao_lf37jv6OtM7zEJcMRA3DNY-vBaba5xqmLCncgSdEx7CxY_pe7mij743aS-SmUoPogm06pv8VIWG-okZcsMmDvN3dHpkXvnRboJg9rE5T3TTSR6ING1z-H31hfR3if')";
                case 'cloudy':
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCCRd1XBZu8p8hjIrEo6VVPChmYusvcB9AsA7VP7VhzrxHtnpEWkLr5rVuwXPcc1OUy7yi-abWVCRp_gehU4p7wwRtqhbmeL3zsMWHnpYGrQeuMWwZgX4QBYTiWPFTEMvqmlfdiK5-AMevJDj4RRD6ZyKuY3fzqN8FJ2ORgJOhXB1fnH9Tg_QBzjfvYyxPIkLi7Kn_uXDBvQj5loRZbuLBP4wZCmODXexEB2fbYluKP1v1xZSm31Ay2G56nYNhg_cpDMk9zRabsn0ta')";
                case 'stormy':
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBwoOuMAzKvMBbfbOrgiUw8eLkM5-i12U7pFbm6fpuc6a3Wnz6BKND-91ZvTTTQ4tUR6Ne44kGat__qgiB8kKaWQSegYgBbVvrVUgzzNHhqeMEHHikG6q-zSq4B5MoNHFiiQaNRbCfw49onl3g468OjKAop8UFJT7jzLiELFu0k7Cio7jwycOgAl5LM7IAySWRTqUQbsCEEeek5p4majPWGuK0UPPF03RX50yr_gF_YQNYUItPePynR7LQv3hNuNd7vOwvJdR-5Kt8e')";
                case 'cyclone':
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5i16taJB0MGbGXcaOYFXFrnghr9b4QjKqBiFXE264xxA5Po9300F4K0uCqClVwcqlazz64nralt2v7HzzP_kVpQXZJkkr_YhM_W0KDUJGKngZxW1-eLcTouBbW53U5MYdxHP_0vRZUGFfNxQ5eQxafoajA32IO7PqHM63qRlXXcP1RVyXuXXQCaslH7AjOkHFkGz2kZm7dNkIo45f8o9nTDhSEP2Vc1VEcJMPu3mh9Sr75gIxoIAXZMgPdIDeOpJdB2uiUqQSff-N')";
                case 'partly_cloudy':
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCOcPF3U7udSk-3cr4WgxLS8GTrP9_DeFEg_qtnUqDsIecS1mjo03AUQ4we44DTf0oQDBhSwg8EAA8tabv0IXD9VDWXkpjXp0cgZVnBFDQvjI-etwuGV7Q784ngkCX5xONnGIeKETOQ8oEPVB5Gl_Q5a_4P-1lkUJOIklOI-XXb_-Vz-2b0buJQAc8OnfGXBgcjhvpNs9MYusPZVEFAA1R8qkXXB2ztP5t3JWPlgiWXNo1QzAfOMhdyh0gjB6lmYEdeAC6Ktjkf6xZU')";
                default:
                    return "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBfQVP-j5-TLyztubiGCfuprQGvw2Fzhz6U8Q1orjxoWziAXvbg_2sxnQXsKxG0v-eJZbB_J97TIOtz1vfav5sOYqCUenEZRuT-6emxwo1qBR4t0nPmJoXXTl-ybBbn7xYnqRPyXjsvynTDyoKkjR3LTF6RPKT2GMg72Gs0D16rJg-58UZUnUkRN69uSvpa5Yn-7-mxmC-FORj1Ksk_Jj3GiZmKYca3Ubeksos7OFzHu9ZsKTPurTbksIBgwrMgcBUN7QTthWuxQLPT')";
            }
        }
    };

    return (
        <>
            {/* Background Image Layer */}
            <div
                className="fixed inset-0 -z-20 bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: getBackgroundImage() }}
            />
            {/* Dark/Light Overlay for legibility */}
            <div
                className={`fixed inset-0 -z-10 backdrop-blur-md transition-all duration-1000 ${['rainy', 'stormy'].includes(condition)
                    ? 'bg-slate-900/60'
                    : isDarkMode
                        ? 'bg-slate-900/40'
                        : 'bg-white/30'
                    }`}
            />

            {/* Weather Particles */}
            {condition === 'rainy' && <RainEffect />}
            {condition === 'snowy' && <SnowEffect />}
        </>
    );
};

export default WeatherBackground;
