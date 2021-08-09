const { Model, DataTypes } = require("sequelize");

class Match extends Model { }

Match.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    atk_chains: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    defence_stats: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    gathers: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    greens_log: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    hp_log: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    log: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    offence_stats: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    offence_timing: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    rogue_log: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    score_log: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    spike_hp: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    spike_log: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    spike_stats: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    spike_summary: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    summary: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    summary_stats: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    support_breakdown: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    support_extras: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    support_powers: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    support_stats: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    collection_id: {
      type: DataTypes.UUID,
      references: {
        model: "collection",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "match",
  }
)

module.exports = Match;
