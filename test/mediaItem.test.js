import { shallowMount } from '@vue/test-utils';
import MediaItem from '../components/MediaItem';
import mediaItemFake from './fakeData/MediaItem';
const mediaItemUtils = require('../helper/testUtils/MediaItemUtils.js');

let wrapper;

const factory = (computed = {}) => {
    return shallowMount(MediaItem, {
        propsData: {
            media: {
                id: {
                    kind: "youtube#video",
                    videoId: "video id",
                },
                snippet: {
                    title: 'title',
                    mediaDescribtion: 'media description',
                    channelTitle: 'channelTitle',
                    description: 'description',
                    publishedAt: '12 jun 2020',
                    thumbnails: {
                        medium: {
                            url: 'thumbnails medium url'
                        }
                    }
                }
            }
        },
        mocks: {},
        stubs: {},
        methods: {},
        computed,
    });
};

beforeEach(() => {
    wrapper = factory();
});

afterEach(() => {
    wrapper.destroy();
});

describe('Media Item', () => {
    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('published date is in year interval ', async () => {
        mediaItemFake.snippet.publishedAt = mediaItemUtils.getDifferentDateInYears();
        await wrapper.setProps({ media: mediaItemFake });
        expect(wrapper.vm.publishedAt).toBe('2 years ago');
    });

    test('published date is in month interval', async () => {
        mediaItemFake.snippet.publishedAt = mediaItemUtils.getDifferentDateInMonths();
        await wrapper.setProps({ media: mediaItemFake });
        expect(wrapper.vm.publishedAt).toBe('2 months ago');
    });

    test('published date is in week interval', async () => {
        mediaItemFake.snippet.publishedAt = mediaItemUtils.getDifferentDateInWeeks();
        await wrapper.setProps({ media: mediaItemFake });
        expect(wrapper.vm.publishedAt).toBe('1 week ago');
    });

    test('published date is in day interval', async () => {
        mediaItemFake.snippet.publishedAt = mediaItemUtils.getDifferentDateInDays();
        await wrapper.setProps({ media: mediaItemFake });
        expect(wrapper.vm.publishedAt).toBe('1 day ago');
    });

    test('published date is in hours interval', async () => {
        mediaItemFake.snippet.publishedAt = mediaItemUtils.getDifferentDateInHours();
        await wrapper.setProps({ media: mediaItemFake });
        expect(wrapper.vm.publishedAt).toBe('3 hours ago');
    });

    test('published date is in minutes interval', async () => {
        mediaItemFake.snippet.publishedAt = mediaItemUtils.getDifferentDateInMinutes();
        await wrapper.setProps({ media: mediaItemFake });
        expect(wrapper.vm.publishedAt).toBe('30 minutes ago');
    });
});
