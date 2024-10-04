import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Card from "../../ui/Card.vue";

describe("Card", () => {
  it("renders properly", () => {
    const wrapper = mount(Card, {
      slots: {
        default: "slot content",
      },
    });
    expect(wrapper.find(".card").exists()).toBe(true);
    expect(wrapper.find(".card").html()).toContain("slot content");
  });
});
