<template>
    <div 
        class="CardMember"
        :class="{'Click': click}"
        :style="{'height': height}">
        <div 
            class="MemberAvartar"
            :style="{'flex': `0 0 ${height}`, 'height': height}">
            <v-avatar
                :color="color"
                :size="height"
                style="border: 1px solid #E9E9E9;">
                <v-img
                    v-if="avatar"
                    :src="avatar">
                </v-img>
                <!-- <v-icon
                    v-else
                    class="pt-3"
                    :size="height + 20"
                    color="#FFFFFF">
                    person
                </v-icon> -->
                <span
                    v-else
                    class="white--text mt-1"
                    :class="{'headline': type === 'md', 'text-h2': type === 'xl'}">
                    {{ initail }}
                </span>
            </v-avatar>
        </div>
        <div 
            v-show="type === 'sm' || type === 'md' "
            class="MemberInfo pl-2" 
            :class="{'Dark': dark}">
            <div class="Name">{{ name }}</div>
            <div class="Account" v-show="type === 'md'">{{ account }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'md'
            },

            avatar: {
                type: String,
                default: null
            },

            name: {
                type: String,
                default: 'Unknown'
            },

            account: {
                type: String,
                default: '-'
            },

            color: {
                type: String,
                default: '#A79DF4'
            },

            dark: {
                type: Boolean,
                default: false
            },

            click: {
                type: Boolean,
                default: true
            }
        },

        computed: {
            height() {
                let height = 50;
                switch(this.type) {
                    case 'xs':
                        height = 50;
                        break;
                    case 'sm': 
                        height = 30;
                        break;
                    case 'md':
                        height = 50;
                        break;
                    case 'xl':
                        height = 150;
                        break;
                    default:
                        height = 50;
                        break;
                }
                return height;
            },

            initail() {
                return this.account.substring(0, 2).toUpperCase();
            }
        }
    }
</script>

<style scoped>
    .CardMember {
        /* min-width: 150px; */
        max-width: 300px;
        width: 100%;
        display: flex;
        align-items: center;
        z-index: 1;
        cursor: default;
    }

    .CardMember.Click {
        cursor: pointer;
    }

    .MemberInfo {
        flex: 1;
        max-width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .MemberInfo .Name {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* 라인수 */
        -webkit-box-orient: vertical;
        word-wrap:break-word;
        word-break:break-all;
        width: 100%;
        height: 1.3em;
        font-size: 15px;
        font-weight: bold;
        font-family: Roboto;
        color: #7E7272;
    }

    .MemberInfo .Account {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* 라인수 */
        -webkit-box-orient: vertical;
        word-wrap:break-word;
        word-break:break-all;
        width: 100%;
        height: 1.3em;
        font-size: 13px;
        font-weight: bold;
        color: #9E9E9E;
    }

    .MemberInfo.Dark .Name,
    .MemberInfo.Dark .Account {
        color: #FFFFFF;
    }
</style>