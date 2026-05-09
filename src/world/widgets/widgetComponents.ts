// Phase A stub — replaced by real ECS widget components when PR #11939 lands.
// Tests mock this module via vi.mock('@/world/widgets/widgetComponents').

import { defineComponentKey } from '../componentKey'

export const WidgetComponentContainer = defineComponentKey<object, unknown>('WidgetComponentContainer')
export const WidgetComponentDisplay = defineComponentKey<object, unknown>('WidgetComponentDisplay')
export const WidgetComponentSchema = defineComponentKey<object, unknown>('WidgetComponentSchema')
export const WidgetComponentSerialize = defineComponentKey<object, unknown>('WidgetComponentSerialize')
export const WidgetComponentValue = defineComponentKey<object, unknown>('WidgetComponentValue')
