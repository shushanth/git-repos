import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Bucket from "../../ui/Bucket.vue";

describe("Bucket", () => {
  it("renders properly", () => {
    const wrapper = mount(Bucket, {
      props: {
        level: "primary",
      },
      slots: {
        default: "slot content",
      },
    });
    expect(wrapper.find(".bucket").exists()).toBe(true);
    expect(wrapper.find(".bucket").html()).toContain("slot content");
    expect(wrapper.find(".bucket--primary").exists()).toBe(true);
  });
});
